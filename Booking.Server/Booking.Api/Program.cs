using Booking.Api;
using Booking.Api.Common;
using Booking.Api.Common.SignalR;
using Booking.Application;
using Booking.Infrastructure;
using Booking.Infrastructure.Common.Initializers;
using Microsoft.AspNetCore.Http.Connections;
 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
	.AddPresentation(builder.Configuration)
	.AddApplication()
	.AddInfrastructure(builder.Configuration);

//NLog
//builder.Logging.ClearProviders();
//builder.Logging.SetMinimumLevel(LogLevel.Trace);
//builder.Host.UseNLog();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
}
else
{
	app.UseExceptionHandler("/error");
	app.UseHsts();
}

app.UseCustomStaticFiles();

app.UseCors(options =>
	options.SetIsOriginAllowed(origin => true)
		.AllowAnyHeader()
		.AllowCredentials()
		.AllowAnyMethod());

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

BookingInitializer.SeedUserAndRoleData(app);
BookingInitializer.SeedPostDataAsync(app);

//For SignalR
app.UseDefaultFiles();
app.UseCors("reactApp");

app.MapHub<ChatHub>("/chat", options =>
{
	options.Transports =
		HttpTransportType.WebSockets |
		HttpTransportType.LongPolling;
});

app.Run();
