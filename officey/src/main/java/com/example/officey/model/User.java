package com.example.officey.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //throws error when username exists
    @Column(unique = true)
    private String username;

    @Column
    private String password;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;

    public User() {}



//    // Do we need roles? Not necessarily...
//    @ManyToOne(cascade = {CascadeType.DETACH,
//            CascadeType.MERGE, CascadeType.REFRESH})
//    @JoinColumn(name = "user_role_id", nullable = false)
//    private UserRole userRole;

//    // POSTS we'll worry about later
//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {CascadeType.DETACH,
//                    CascadeType.MERGE, CascadeType.REFRESH})
//    @JoinTable(name = "playlist",
//            joinColumns = {@JoinColumn(name = "user_id")},
//            inverseJoinColumns = @JoinColumn(name = "song_id"))
//    private List<Songs> songs;

//    public List<Songs> addSongsToList (Songs song){
//        if(songs == null)
//            songs = new ArrayList<>();
//        songs.add(song);
//
//        return songs;
//    }
//    public List<Songs> deleteSongsFromList (Songs song) {
//        try {
//            songs.remove(song);
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return songs;
//    }
//
//    public List<Songs> getSongs(){ return songs; }
//
//    public void setSongs(List<Songs> songs) { this.songs = songs; }


//    public UserRole getUserRole() { return userRole; }
//
//    public void setUserRole(UserRole userRole) { this.userRole = userRole; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}








