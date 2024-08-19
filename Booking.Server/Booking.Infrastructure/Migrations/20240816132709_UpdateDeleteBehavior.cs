using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Posts_PostId",
                table: "ChatRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_AspNetUsers_ClientId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Posts_PostId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_PostPostTypesOfRest_PostTypesOfRest_PostTypeOfRestId",
                table: "PostPostTypesOfRest");

            migrationBuilder.DropForeignKey(
                name: "FK_PostPostTypesOfRest_Posts_PostId",
                table: "PostPostTypesOfRest");

            migrationBuilder.DropForeignKey(
                name: "FK_PostServices_Posts_PostId",
                table: "PostServices");

            migrationBuilder.DropForeignKey(
                name: "FK_PostServices_Services_ServiceId",
                table: "PostServices");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMessages_ChatRooms_ChatRoomId",
                table: "UserMessages");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Posts_PostId",
                table: "ChatRooms",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_AspNetUsers_ClientId",
                table: "Feedbacks",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Posts_PostId",
                table: "Feedbacks",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostPostTypesOfRest_PostTypesOfRest_PostTypeOfRestId",
                table: "PostPostTypesOfRest",
                column: "PostTypeOfRestId",
                principalTable: "PostTypesOfRest",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostPostTypesOfRest_Posts_PostId",
                table: "PostPostTypesOfRest",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostServices_Posts_PostId",
                table: "PostServices",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostServices_Services_ServiceId",
                table: "PostServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessages_ChatRooms_ChatRoomId",
                table: "UserMessages",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "ChatRoomId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Posts_PostId",
                table: "ChatRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_AspNetUsers_ClientId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Posts_PostId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_PostPostTypesOfRest_PostTypesOfRest_PostTypeOfRestId",
                table: "PostPostTypesOfRest");

            migrationBuilder.DropForeignKey(
                name: "FK_PostPostTypesOfRest_Posts_PostId",
                table: "PostPostTypesOfRest");

            migrationBuilder.DropForeignKey(
                name: "FK_PostServices_Posts_PostId",
                table: "PostServices");

            migrationBuilder.DropForeignKey(
                name: "FK_PostServices_Services_ServiceId",
                table: "PostServices");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMessages_ChatRooms_ChatRoomId",
                table: "UserMessages");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Posts_PostId",
                table: "ChatRooms",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_AspNetUsers_ClientId",
                table: "Feedbacks",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Posts_PostId",
                table: "Feedbacks",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostPostTypesOfRest_PostTypesOfRest_PostTypeOfRestId",
                table: "PostPostTypesOfRest",
                column: "PostTypeOfRestId",
                principalTable: "PostTypesOfRest",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostPostTypesOfRest_Posts_PostId",
                table: "PostPostTypesOfRest",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostServices_Posts_PostId",
                table: "PostServices",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostServices_Services_ServiceId",
                table: "PostServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMessages_ChatRooms_ChatRoomId",
                table: "UserMessages",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "ChatRoomId");
        }
    }
}
