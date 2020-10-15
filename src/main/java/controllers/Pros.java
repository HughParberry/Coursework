package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("Pros/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Pros {
    @GET
    @Path("list")
    public String ProList() {
        System.out.println("Invoked Users.ProList()");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT proID, proPseudo FROM Pros");
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {
                JSONObject row = new JSONObject();
                row.put("proID", results.getInt(1));
                row.put("proPseudo", results.getString(2));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }
    @POST
    @Path("update")
    public String updateFood(@FormDataParam("proID") Integer proId, @FormDataParam("proPseudo") String UserName) {
        try {
            System.out.println("Invoked Users.UpdateUsers/update UserID=" + proId);
            PreparedStatement ps = Main.db.prepareStatement("UPDATE Users SET UserName = ? WHERE UserID = ?");
            ps.setString(1, UserName);
            ps.setInt(2, proId);
            ps.execute();
            return "{\"OK\": \"Users updated\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to update item, please see server console for more info.\"}";
        }
    }


    @POST
    @Path("add")
    public String proAdd(@FormDataParam("proFore") String proFore, @FormDataParam("proSur") String proSur, @FormDataParam("proPseudo") String proPseudo,  @FormDataParam("dateBirth") String dateBirth, @FormDataParam("netWorth") Float netWorth) {
        System.out.println("Invoked Pro.proAdd()");
        try {
            PreparedStatement ps = server.Main.db.prepareStatement("INSERT INTO Pros (proFore, proSur, proPseudo, dateBirth, netWorth) VALUES ( ?, ?, ?, ?, ?)");
            ps.setString(1, proFore);
            ps.setString(2, proSur);
            ps.setString(3, proPseudo);
            ps.setString(4, dateBirth);
            ps.setFloat( 5,netWorth);
            ps.execute();
            return "{\"OK\": \"Added pro.\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to create new item, please see server console for more info.\"}";
        }

    }

    @POST
    @Path("delete/{proID}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String DeleteUser(@PathParam("proID") Integer proId) throws Exception {
        System.out.println("Invoked Users.DeletePro()");
        if (proId == null) {
            throw new Exception("proID is missing in the HTTP request's URL.");
        }
        try {
            PreparedStatement ps = server.Main.db.prepareStatement("DELETE FROM Pros WHERE proId = ?");
            ps.setInt(1, proId);
            ps.execute();
            return "{\"OK\": \"Pro deleted\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }


}
