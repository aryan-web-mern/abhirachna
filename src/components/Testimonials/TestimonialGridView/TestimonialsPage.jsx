import React, { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import video1 from "../../../assets/video1.mp4";
import Styles from "./testimonials.module.css";
import { TestimonialGridContent } from "../../../utils/constantData";
import { fetchTestimonialsData } from "../../../services/testimonials";
import { testimonialsGridChunk } from "../../../utils/functions";
import { getErrorMessage } from "../../../utils/errorHandler";
import FullScreenTestimonial from "./FullScreenTestiminial";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import FullScreenTestiminial from "./FullScreenTestiminial";
import { useToast } from "../../../hooks/hooks";

const videoMap = {
  "video1.mp4": video1,
};

//let me me me

const TestimonialsPage = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [fullScreenItem, setFullScreenItem] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();

  const toast = useToast();

  useEffect(() => {
    async function fetchingTestimonials(page, limit) {
      setLoading(true);
      try {
        if (total !== null && testimonialData.length >= total) {
          setHasMore(false);
          return;
        }
        const data = await fetchTestimonialsData(page, limit);

        console.log(data, "data");
        

        const testimonial = data?.data?.testimonials || [];
        console.log(testimonial);
        
        const setData = testimonialsGridChunk(testimonial);
        setTestimonialData((prev) => [...prev, ...setData]);
        setTotal(data?.data?.total);
        setHasMore(testimonial.length > 0);
        console.log(total);
        
      } catch (err) {
        toast.error("Something went wrong!", err.response.data.message);
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    fetchingTestimonials(pageNo, 16);
  }, [pageNo]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNo((prev) => {
          return prev + 1;
        });
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.container}>
        {testimonialData?.map((d, index) => {
          let BoxNumber = 1;
          return (
            <div key={index} className={Styles.parentGrid}>
              {/* 6 pattern grid */}
              {d?.[0] && (
                <div className={Styles.grid}>
                  {d?.[0]?.map((item) => {
                    return (
                      <TestimonialCard
                        key={item._id}
                        {...item}
                        BoxNumber={BoxNumber++}
                        src={
                          item?.video
                            ? `${apiBaseUrl}/s3/getimage?key=${item.video}`
                            : item?.image
                            ? `${apiBaseUrl}/s3/getimage?key=${item.image}`
                            : ""
                        }
                        onFullScreen={setFullScreenItem}
                      />
                    );
                  })}
                  {fullScreenItem && (
                    <FullScreenTestiminial
                      testimonial={fullScreenItem}
                      onClose={() => setFullScreenItem(null)}
                    />
                  )}
                </div>
              )}

              {/* 2 pattern grid */}
              {d?.[1] && (
                <div className={Styles.grid2}>
                  {d?.[1]?.map((item) => (
                    <TestimonialCard
                      key={item._id}
                      {...item}
                      BoxNumber={BoxNumber++}
                      src={
                        item?.video
                          ? `${apiBaseUrl}/s3/getimage?key=${item.video}`
                          : item?.image
                          ? `${apiBaseUrl}/s3/getimage?key=${item.image}`
                          : ""
                      }
                      onFullScreen={setFullScreenItem}
                    />
                  ))}
                  {fullScreenItem && (
                    <FullScreenTestiminial
                      testimonial={fullScreenItem}
                      onClose={() => setFullScreenItem(null)}
                    />
                  )}
                </div>
              )}

              {/* 6 pattern 2 grid   */}
              {d?.[2] && (
                <div className={Styles.grid3}>
                  {d?.[2]?.map((item) => (
                    <TestimonialCard
                      key={item._id}
                      {...item}
                      BoxNumber={BoxNumber++}
                      src={
                        item?.video
                          ? `${apiBaseUrl}/s3/getimage?key=${item.video}`
                          : item?.image
                          ? `${apiBaseUrl}/s3/getimage?key=${item.image}`
                          : ""
                      }
                      onFullScreen={setFullScreenItem}
                    />
                  ))}
                  {fullScreenItem && (
                    <FullScreenTestiminial
                      testimonial={fullScreenItem}
                      onClose={() => setFullScreenItem(null)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
        {hasMore && (
          <div
            ref={loaderRef}
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading && <span>Loading...</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;
