using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangePostPostTypeOfRent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PostPostTypesOfRest",
                table: "PostPostTypesOfRest");

            migrationBuilder.DropIndex(
                name: "IX_PostPostTypesOfRest_PostId",
                table: "PostPostTypesOfRest");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PostPostTypesOfRest");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostPostTypesOfRest",
                table: "PostPostTypesOfRest",
                columns: new[] { "PostId", "PostTypeOfRestId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PostPostTypesOfRest",
                table: "PostPostTypesOfRest");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "PostPostTypesOfRest",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostPostTypesOfRest",
                table: "PostPostTypesOfRest",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_PostPostTypesOfRest_PostId",
                table: "PostPostTypesOfRest",
                column: "PostId");
        }
    }
}
