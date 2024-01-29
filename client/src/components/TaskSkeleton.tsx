import React from 'react'
import ContentLoader from 'react-content-loader'

const TaskSkeleton = ({}) => {
	return (
		<ContentLoader
			speed={2}
			width={600}
			height={80}
			viewBox='0 0 600 80'
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
		>
			<rect x='75' y='164' rx='3' ry='3' width='52' height='6' />
			<rect x='0' y='0' rx='14' ry='14' width='600' height='80' />
			<rect x='23' y='19' rx='0' ry='0' width='82' height='48' />
		</ContentLoader>
	)
}

export default TaskSkeleton
