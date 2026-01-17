"use client";

interface Props {
  videoId: string;
}

export default function VideoPlayer({ videoId }: Props) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube player"
      allowFullScreen
    />
  );
}
