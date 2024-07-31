using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFeedbackTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_AspNetUsers_RealtorId",
                table: "Feedbacks");

            migrationBuilder.RenameColumn(
                name: "RealtorId",
                table: "Feedbacks",
                newName: "PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_RealtorId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Posts_PostId",
                table: "Feedbacks",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Posts_PostId",
                table: "Feedbacks");

            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "Feedbacks",
                newName: "RealtorId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_PostId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_RealtorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_AspNetUsers_RealtorId",
                table: "Feedbacks",
                column: "RealtorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
