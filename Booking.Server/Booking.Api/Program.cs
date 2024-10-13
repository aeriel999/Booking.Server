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

app.UseStaticFiles();

//app.UseCors(options =>
//	options.WithOrigins("https://client.tamos.click")
//		.AllowAnyHeader()
//		.AllowCredentials()
//		.AllowAnyMethod()
//		.SetIsOriginAllowed((host) => true));


app.UseHttpsRedirection();

app.UseCors("reactApp");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

BookingInitializer.SeedUserAndRoleData(app);
BookingInitializer.SeedPostDataAsync(app);

//For SignalR
app.UseDefaultFiles();
//app.UseStaticFiles();

app.MapHub<ChatHub>("/chat", options =>
{
	options.Transports =
		HttpTransportType.WebSockets;
});



app.Run();
