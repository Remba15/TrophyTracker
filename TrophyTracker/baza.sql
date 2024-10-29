create table Users(
	ID int not null primary key identity(1,1),
	Email varchar(50) not null,
	_Password varchar(200) not null
);

create table Players(
	ID int not null primary key identity(1,1),
	Username varchar(50) not null,
	RegistrationDate datetime not null,
	Region varchar(50) not null
);

create table Games(
	ID int not null primary key identity(1,1),
	Title varchar(50) not null,
	Developer varchar(50),
	GamePlatform varchar(50),
	GameDescription varchar(MAX)
);

create table Trophies(
	ID int not null primary key identity(1,1),
	Title varchar(50) not null,
	TrophyDescription varchar(MAX),
	Game int not null foreign key references Games(ID),
	TrophyType varchar(10)
);

create table Achievements(
	ID int not null primary key identity(1,1),
	PlayerID int not null foreign key references Players(ID),
	TrophyID int not null foreign key references Trophies(ID),
	DateAchieved DATETIME
);

insert into Players(Username, RegistrationDate, Region) values
	('Remba15', '2023-05-13', 'Croatia'), ('User2', '2024-06-06', 'France'), ('User3', '2020-05-12', 'Japan');
	
select * from Players;

insert into Games(Title, Developer, GamePlatform) values
	('Dead Space 2', 'Visceral Games', 'Playstation 3'), ('Resident evil', 'Capcom', 'Playstation'), ('Lethal Company', 'Zeekersrblx', 'Steam');
	
select * from Games;

insert into Trophies (Title, Game, TrophyType) values
	('The Final Frontier', 1, 'Platinum'), ('Enter Survival', 2, 'Bronze'), ('Is This A Jetpack?', 3, 'Silver');
	
select * from Trophies;

insert into Achievements (PlayerID, TrophyID, DateAchieved) values
	(1, 2, '2021-04-05 18:23'), (1, 3, '2023-02-02 0:18'), (2, 1, '2015-06-13 10:25');
	
select * from Achievements;

insert into Users values ('edunova@edunova.hr', '$2a$15$9xMDthO5VOFWMfOD0EJGou7wqfpwyeg/.My2E.y4NcvTUESVydms2');

select * from Users;

