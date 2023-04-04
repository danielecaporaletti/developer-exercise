import MiniOpinion from './MiniOpinion';
import MiniOpinionNoImg from './MiniOpinion NoImg';
import MiniOpinionBigImg from './MiniOpinionBigImg';
import styles from './OpionionListArticles.module.css';
import React, { useState, useEffect } from 'react'

const OpinionListArticle = ({opinionArticles}) => {

  const [isReduce, setIsReduce] = useState({"reduce": false, "moreReduce": false});

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 1069) {
        setIsReduce({"reduce": true, "moreReduce": false});
      } else {
        setIsReduce({"reduce": false, "moreReduce": false});
      }

      if (screenWidth <= 739) {
        setIsReduce({"reduce": true, "moreReduce": true});
      } 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.opinion}>Opinion</div>
      {isReduce.reduce &&  !isReduce.moreReduce && (
        <div className={styles.containers}>
          <div className={styles.left}>
            {opinionArticles?.slice(0, 2).map( (opinion) => (
              <>
              <MiniOpinionNoImg opinion={opinion} />
              <div className={styles.diviso} />
              </>
            ))}
          </div>
          <div className={styles.divisoVer}/>
          <div className={styles.right}>
            {opinionArticles?.slice(2, 3).map( (opinion) => (
              <MiniOpinionBigImg opinion={opinion} />
            ))}
            <div className={styles.diviso} />
            {opinionArticles?.slice(3, 4).map( (opinion) => (
              <MiniOpinionNoImg opinion={opinion} />
            ))}
          </div>
        </div>
      )}

      {!isReduce.reduce && !isReduce.moreReduce && (
        opinionArticles.map((opinion, index) => (
          <React.Fragment key={index}>
            <div className={styles.miniOpinion}>
              {index % 2 != 0 ? (
                <MiniOpinion opinion={opinion} />
              ) : (
                <MiniOpinionNoImg opinion={opinion} />
              )}

            </div>
            <div className={styles.diviso} />
          </React.Fragment>
        ))
      )}

      {isReduce.reduce && isReduce.moreReduce && (
        <>
          {opinionArticles?.slice(0, 1).map( (opinion) => (
            <>
            <MiniOpinionNoImg opinion={opinion} />
            <div className={styles.diviso} />
            </>
          ))}
          {opinionArticles?.slice(1, 2).map( (opinion) => (
            <>
            <MiniOpinionBigImg opinion={opinion} />
            <div className={styles.diviso} />
            </>
          ))}
          {opinionArticles?.slice(2, 3).map( (opinion) => (
            <>
            <MiniOpinionNoImg opinion={opinion} />
            <div className={styles.diviso} />
            </>
          ))}
          {opinionArticles?.slice(3, 4).map( (opinion) => (
            <>
            <MiniOpinionBigImg opinion={opinion} />
            <div className={styles.diviso} />
            </>
          ))}
          {opinionArticles?.slice(4, 5).map( (opinion) => (
            <>
            <MiniOpinionNoImg opinion={opinion} />
            <div className={styles.diviso} />
            </>
          ))}
          {opinionArticles?.slice(5, 6).map( (opinion) => (
            <>
            <MiniOpinionBigImg opinion={opinion} />
            <div className={styles.diviso} />
            </>
          ))}
        </>
      )}
    </>
  );
}

export default OpinionListArticle;