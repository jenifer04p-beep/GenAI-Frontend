import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // 🔥 FETCH USER
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/signin");
      return;
    }

    fetch(`http://127.0.0.1:5000/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setUser(data);
        } else {
          setMessage("User not found");
        }
      })
      .catch(() => {
        setMessage("Failed to load profile");
        navigate("/signin");
      })
      .finally(() => setLoading(false));

  }, [navigate]);

  // 🔥 SAVE PROFILE (FIXED)
  const handleSave = async () => {
    const userId = localStorage.getItem("userId");

    const payload = {
      name: user.name,
      bio: user.bio,
      skills: user.skills,
      profile_pic: user.profile_pic,
      social_links: user.social_links
    };

    try {
      setSaving(true);
      setMessage("");

      const res = await fetch(`http://127.0.0.1:5000/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // ✅ FIXED
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Profile updated successfully");
        setEdit(false);
      } else {
        setMessage(data.message || "Update failed");
      }

    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page">Loading profile...</div>;

  return (
    <div className="page">
      <section className="section">
        <div className="container">

          <Card className="profilePro">

            {/* MESSAGE */}
            {message && <div className="infoBox">{message}</div>}

            {/* HEADER */}
            <div className="profileHeader">

              {user?.profile_pic ? (
                <img
                  src={user.profile_pic}
                  alt="avatar"
                  className="avatarXL img"
                />
              ) : (
                <div className="avatarXL">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <h2>{user.name}</h2>
                <p className="email">{user.email}</p>
              </div>
            </div>

            {/* FORM */}
            <div className="profileGrid">

              <div className="fieldBox">
                <label>Name</label>
                <input
                  className="input"
                  value={user.name || ""}
                  disabled={!edit}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              </div>

              <div className="fieldBox">
                <label>Bio</label>
                <textarea
                  className="input"
                  value={user.bio || ""}
                  disabled={!edit}
                  onChange={(e) =>
                    setUser({ ...user, bio: e.target.value })
                  }
                  placeholder="Tell something about yourself..."
                />
              </div>

              <div className="fieldBox">
                <label>Skills</label>
                <input
                  className="input"
                  value={user.skills || ""}
                  disabled={!edit}
                  onChange={(e) =>
                    setUser({ ...user, skills: e.target.value })
                  }
                  placeholder="React, Java, SQL..."
                />

                {/* 🔥 SKILLS PREVIEW */}
                <div className="skillTags">
                  {user.skills?.split(",").map((s, i) => (
                    <span key={i} className="tag">{s.trim()}</span>
                  ))}
                </div>
              </div>

              <div className="fieldBox">
                <label>Social Links</label>
                <input
                  className="input"
                  value={user.social_links || ""}
                  disabled={!edit}
                  onChange={(e) =>
                    setUser({ ...user, social_links: e.target.value })
                  }
                  placeholder="LinkedIn / GitHub"
                />
              </div>

              <div className="fieldBox">
                <label>Profile Image URL</label>
                <input
                  className="input"
                  value={user.profile_pic || ""}
                  disabled={!edit}
                  onChange={(e) =>
                    setUser({ ...user, profile_pic: e.target.value })
                  }
                  placeholder="Paste image URL"
                />

                {/* 🔥 IMAGE PREVIEW */}
                {user.profile_pic && (
                  <img src={user.profile_pic} className="previewImg" />
                )}
              </div>

            </div>

            {/* ACTIONS */}
            <div className="profileActions">
              {!edit ? (
                <Button onClick={() => setEdit(true)}>
                  Edit Profile
                </Button>
              ) : (
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              )}

              <Button variant="ghost" onClick={() => navigate("/")}>
                Back
              </Button>
            </div>

          </Card>

        </div>
      </section>
    </div>
  );
}