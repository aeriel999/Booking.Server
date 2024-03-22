using Booking.Api;
using Booking.Api.Common;
using Booking.Application;
using Booking.Infrastructure;
using Booking.Infrastructure.Common.Initializers;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
	.AddPresentation()
	.AddApplication()
	.AddInfrastructure(builder.Configuration);

//NLog
builder.Logging.ClearProviders();
builder.Logging.SetMinimumLevel(LogLevel.Trace);
builder.Host.UseNLog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();

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

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

//UserAndRolesInitializer.SeedData(app);

app.Run();
