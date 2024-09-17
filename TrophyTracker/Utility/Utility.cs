namespace TrophyTracker.Utility
{
    public static class Utility
    {

        public static bool DEV = false;

        internal static string InsertString(string message)
        {
            string output;
            while (true)
            {
                Console.Write(message + ": ");
                output = Console.ReadLine().Trim();
                if (output.Length == 0)
                {
                    Console.WriteLine("You cannot insert blank text");
                    continue;
                }
                return output;
            }
        }

        internal static int InsertNumberRange(string message, int min, int max)
        {
            int input;
            while (true)
            {
                try
                {
                    Console.Write(message + ": ");
                    input = int.Parse(Console.ReadLine());
                    if (input < min || input > max)
                    {
                        throw new Exception();
                    }
                    return input;
                }
                catch
                {
                    var ConsoleForeground = Console.ForegroundColor;
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("\nWrong input, input number must be in range between {0} and {1}!", min, max);
                    Console.ForegroundColor = ConsoleForeground;
                }
            }
        }

        public static void PressAnyKeyToReturn()
        {
            Console.WriteLine("\nPress any key to return...");
            Console.ReadKey();
            Console.Clear();
        }

    }
}
