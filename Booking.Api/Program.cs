using Booking.Api;
using Booking.Api.Common;
using Booking.Application;
using Booking.Infrastructure;
using Booking.Infrastructure.Common.Initializers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
	.AddPresentation()
	.AddApplication()
	.AddInfrastructure(builder.Configuration);


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
