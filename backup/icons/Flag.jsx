
import React from 'react';



function Flag(props) {
  const { size = 20 } = props;

  return (
    <svg height={size} viewBox="0 0 24 24" style={{
      fill: props.color || '#d00',
      stroke: 'none'
    }}>
      <g>
        <path d="M5.788,0C5.269,0,4.72,0.422,4.72,0.941V27.23l1.443,1.207l1.58-1.207V15.334L7.9,0.047C7.9,0.047,6.245,0,5.788,0z" />
        <polygon points="8.605,0.047 8.491,11.158 23.717,5.729 	" />
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
    </svg>
  );
}

export default React.memo(Flag);