import React from "react";
import { Skeleton } from '@mui/material';


const SkeletonTemplate = () => (
    
    <>
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rectangular" width={210} height={60} />
    </>

)


export default SkeletonTemplate;