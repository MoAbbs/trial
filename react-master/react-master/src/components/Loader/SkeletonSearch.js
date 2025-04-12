import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonSearch =()=> {

    return(
        <div className="skeleton_search_box">
            <Skeleton variant="rect"  />
            <Skeleton variant="rect"  />
            <Skeleton variant="rect"  />
            <Skeleton variant="rect"  />
            <Skeleton variant="rect"  />
            <Skeleton variant="rect"  />
            <Skeleton variant="rect"  />

        </div>
      );
};
export default SkeletonSearch;