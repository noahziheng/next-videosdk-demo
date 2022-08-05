const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0NTI1NzJhOC1lMTA4LTRmMDMtOWY4My1jYTUzZGQxN2MyZmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY1OTY4NjUxOCwiZXhwIjoxNjYwMjkxMzE4fQ.7hVWh3kxVdHGjl91IwKhc2rqzL8pOVeBoWetNWTavmA";

// API call to create meeting
export default async function createMeeting (req, res) {
  const liveRes = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await liveRes.json();
  await res.json({ meetingId, token: authToken });
};
