using Microsoft.EntityFrameworkCore;
using AnvilAndQuill.Data;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MonsterDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//cors to allow Vue to make api calls from different ports on localhost
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVue",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())

{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowVue");
app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

Process? reactProcess = null;

if (app.Environment.IsDevelopment())
{
    var reactPath = Path.Combine(
        Directory.GetCurrentDirectory(),
        "anvil-quill-client"
    );

    if (Directory.Exists(reactPath))
    {
        reactProcess = new Process
        {
            StartInfo = new ProcessStartInfo

            {
                FileName = "cmd.exe",
                Arguments = "/c npm start",
                WorkingDirectory = reactPath,
                UseShellExecute = false,
                CreateNoWindow = false
            }
        };

        reactProcess.StartInfo.EnvironmentVariables["BROWSER"] = "none"; // Prevents React from opening a new browser window

        reactProcess.Start();

       _ = Task.Run(async() =>
        {
            try
            {
                await Task.Delay(5000);
                Console.WriteLine("Opening browser to http://localhost:3000");
                Process.Start(new ProcessStartInfo
                {
                    FileName = "http://localhost:3000",
                    UseShellExecute = true
                });
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Failed to open browser: {ex.Message}");
            }
        });


    }
}

AppDomain.CurrentDomain.ProcessExit += (s, e) =>
{
    if (reactProcess != null && !reactProcess.HasExited)
    {
        Console.WriteLine("Stopping React development server...");
        KillProcessAndChildren(reactProcess.Id);
    }
};

app.Run();

static void KillProcessAndChildren(int pid)
{
    try
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "taskkill",
                Arguments = $"/pid {pid} /T /F",
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };
        process.Start();
        process.WaitForExit();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error killing process: {ex.Message}");
    }
}
