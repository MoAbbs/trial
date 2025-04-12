import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonProfile =()=> {

    return(
        <div className="skeleton-profile-box">
            <Skeleton variant="rect" width={158} height={158} />
        </div>
      );
};
export default SkeletonProfile;