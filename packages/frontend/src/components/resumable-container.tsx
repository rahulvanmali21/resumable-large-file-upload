import React, { useEffect, useRef } from "react";
import Resumable from "resumablejs";
const SERVER_URL = "localhost:3000";
const ResumableContainer = (props: any) => {
  const resumable = useRef<Resumable | null>();
  useEffect(() => {
    if (resumable.current) return;
    resumable.current = new Resumable({
      target: `${SERVER_URL}/api/photo/redeem-upload-token`,
      query: { upload_token: "my_token" },
    });
    return () => {
      resumable.current = null;
    };
  }, []);
  return <div>resumable-container</div>;
};

export default ResumableContainer;
