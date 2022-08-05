import { useState, useRef, useEffect, useMemo } from 'react';
import {
	useMeeting,
	useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from 'react-player';
import Controls from './controls';

function VideoComponent(props) {
	const micRef = useRef(null);
	const { webcamStream, micStream, webcamOn, micOn } = useParticipant(
	  props.participantId
	);
  
	const videoStream = useMemo(() => {
	  if (webcamOn) {
		const mediaStream = new MediaStream();
		mediaStream.addTrack(webcamStream.track);
		return mediaStream;
	  }
	}, [webcamStream, webcamOn]);
  
	useEffect(() => {
	  if (micRef.current) {
		if (micOn) {
		  const mediaStream = new MediaStream();
		  mediaStream.addTrack(micStream.track);
  
		  micRef.current.srcObject = mediaStream;
		  micRef.current
			.play()
			.catch((error) =>
			  console.error("videoElem.current.play() failed", error)
			);
		} else {
		  micRef.current.srcObject = null;
		}
	  }
	}, [micStream, micOn]);
  
	return (
	  <div key={props.participantId}>
		{micOn && micRef && <audio ref={micRef} autoPlay />}
		{webcamOn && (
		  <ReactPlayer
			//
			playsinline // very very imp prop
			pip={false}
			light={false}
			controls={true}
			muted={true}
			playing={true}
			//
			url={videoStream}
			//
			height={"100px"}
			width={"100px"}
			onError={(err) => {
			  console.log(err, "participant video error");
			}}
		  />
		)}
	  </div>
	);
  }

export default (props) => {
	const [joined, setJoined] = useState(false);
	const { join } = useMeeting();
	const { participants } = useMeeting();
	const joinMeeting = () => {
	  setJoined(true);
	  join();
	};
  
	return (
	  <div className="container">
		<h3>Meeting Id: {props.meetingId}</h3>
		{joined ? (
		  <div>
			<Controls />
			{[...participants.keys()].map((participantId) => (
			  <VideoComponent participantId={participantId} />
			))}
		  </div>
		) : (
		  <button onClick={joinMeeting}>Join</button>
		)}
	  </div>
	);
};