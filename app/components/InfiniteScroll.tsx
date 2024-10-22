import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  loading: boolean,
  enable: boolean,
  loadMore: () => void
}

const InfiniteScroll = ({ loading, enable, loadMore, children }: PropsWithChildren<InfiniteScrollProps>) => {
  const endRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && enable) {
          loadMore();
        }
      });
    }, {});

    if (endRef.current) observer.observe(endRef.current);

    return () => {
      if (endRef.current) observer.unobserve(endRef.current);
    };
  }, [enable, loadMore]);

  return (
    <div className="w-full">
      <div>{children}</div>
      {(
        <div className="flex justify-center mt-2 w-full h-10" ref={endRef}>
          {loading ? <div>Loading...</div> : <></>}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
