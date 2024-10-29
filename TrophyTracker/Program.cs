using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TrophyTracker.Data;
using TrophyTracker.Mapping;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( sgo =>
{
    //SECURITY
    sgo.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Autorizacija radi tako da se prvo na ruti /api/v1/Autorizacija/token.  
                              autorizirate i dobijete token (bez navodnika). Upišite 'Bearer' [razmak] i dobiveni token.
                              Primjer: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTc3MTc2MjksImV4cCI6MTY5Nzc0NjQyOSwiaWF0IjoxNjk3NzE3NjI5fQ.PN7YPayllTrWESc6mdyp3XCQ1wp3FfDLZmka6_dAJsY'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    sgo.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
            Reference = new OpenApiReference
                {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,

            },
            new List<string>()
        }
    });
    //END SECURITY
});

//Add database
builder.Services.AddDbContext<TrophyTrackerContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("TrophyTrackerContext"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );
});

//Automapper
builder.Services.AddAutoMapper(typeof(TrophyTrackerMappingProfile));

//Security
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MyKeyWhichIsVerySecretAndLongEnoughSoThatItCanBeUsed")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = false
    };
});
builder.Services.AddAuthorization();
//End security

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {

        options.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
        options.EnableTryItOutByDefault();

    });
//}

app.UseHttpsRedirection();

//SECURITY
app.UseAuthentication();
//END SECURITY

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.UseCors("CorsPolicy");

app.Run();
