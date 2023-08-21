// ProfileEdit.js
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase/FirebaseInit";

function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newSocialLinks, setNewSocialLinks] = useState("");

  useEffect(() => {
    // Fetch the user's profile data from Firestore based on their UID
    const fetchUserProfile = async () => {
      const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
      setUser(userDoc.data());
    };
    
    fetchUserProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      // Update user profile data in Firestore
      await db.collection("users").doc(auth.currentUser.uid).update({
        username: newUsername,
        bio: newBio,
        socialLinks: newSocialLinks,
      });

      // Refresh user data
      const updatedUserDoc = await db.collection("users").doc(auth.currentUser.uid).get();
      setUser(updatedUserDoc.data());

      // Reset input fields
      setNewUsername("");
      setNewBio("");
      setNewSocialLinks("");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Username</label>
      <input
        type="text"
        value={newUsername || user.username}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <label>Bio</label>
      <textarea
        value={newBio || user.bio}
        onChange={(e) => setNewBio(e.target.value)}
      ></textarea>
      <label>Social Links</label>
      <input
        type="text"
        value={newSocialLinks || user.socialLinks}
        onChange={(e) => setNewSocialLinks(e.target.value)}
      />
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}

export default ProfileEdit;
