import React from 'react';
import { Card } from 'react-bootstrap';

const VideoCard = ({ video }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        {video.description && <Card.Text>{video.description}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default VideoCard;