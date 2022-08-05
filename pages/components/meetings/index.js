import React, { useEffect, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
} from "@videosdk.live/react-sdk";
import Container from './container';
import JoinScreen from './join-screen';

export default function Meetings() {
  const [meetingId, setMeetingId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const getMeetingAndToken = async (id) => {
	const res = await fetch('/api/meetings');
    const { meetingId, token } = await res.json();
    setMeetingId(meetingId);
	setAuthToken(token);
  };

  return meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: false,
        name: "Noah Gao",
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => <Container meetingId={meetingId} />}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
};