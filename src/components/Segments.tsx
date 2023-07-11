/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRanger } from 'react-ranger';

const GlobalStyles = createGlobalStyle`
  body {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
   font-weight: 300;
  }
`;

export const Track = styled.div`
  display: inline-block;
  height: 8px;
  width: 90%;
  margin: 0 5%;
`;

export const Tick = styled.div`
  :before {
    content: "";
    position: absolute;
    left: 0;
    background: rgba(200, 200, 0, 0.2);
    height: 5px;
    width: 2px;
    transform: translate(-50%, 0.7rem);
  }
`;

export const TickLabel = styled.div`
  position: absolute;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
  top: 100%;
  transform: translate(-50%, 1.2rem);
  white-space: nowrap;
`;

// todo make it scale w random colors
export const Segment = styled.div`
  background: ${(props: any) =>
    props.index % 4 === 0
      ? '#3e8aff'
      : props.index % 4 === 1
      ? '#00d5c0'
      : props.index % 4 === 2
      ? '#f5c200'
      : '#ff6050'};
  height: 100%;
`;

export const Handle = styled.div`
  background: #ff1a6b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  font-weight: ${(props: any) => (props.active ? 'bold' : 'normal')};
  transform: ${(props: any) =>
    props.active ? 'translateY(20%) scale(0.95)' : 'translateY(0) scale(1)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

function middleInBetweenNumbers(min: number, max: number) {
  return Math.floor((max + min) / 2);
}

const Segments = () => {
  const endRange = 600;
  const [values, setValues] = React.useState([15, 50, 80]);
  const [selectedSegment, setSelectedSegment] = React.useState(0);
  const [selectedHandle, setSelectedHandle] = React.useState(0);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min: 0,
    max: endRange,
    stepSize: 1,
    values,
    onChange: setValues,
  });

  return (
    <div>
      <Track {...getTrackProps()}>
        {ticks.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{}</TickLabel>
          </Tick>
        ))}
        {segments.map(({ getSegmentProps }, i) => (
          <Segment
            {...getSegmentProps({
              style:
                selectedSegment === i
                  ? {
                      //background: "grey",
                      opacity: 1,
                      position: 'relative',
                      top: -8,
                      borderBottom: '1px solid red',
                      height: 15,
                    }
                  : {
                      opacity: 0.7,
                      top: 0,
                      borderBottom: 'none',
                      height: undefined,
                    },
            })}
            index={i}
            onClick={() => {
              setSelectedSegment(i);
              setSelectedHandle(i === values.length ? i - 1 : i);
              console.log({ props: getSegmentProps(), handles, values });
            }}
            key={'er-' + i}
            onDoubleClick={() => {
              setValues((prev) => {
                let insertVal =
                  i === prev.length
                    ? middleInBetweenNumbers(prev[i - 1], endRange)
                    : middleInBetweenNumbers(prev[i], prev[i - 1]);
                if (i === 0) {
                  insertVal = middleInBetweenNumbers(
                    0,
                    prev.length === 0 ? endRange : prev[0]
                  );
                }
                const newValues = [
                  ...prev.slice(0, i),
                  insertVal,
                  ...prev.slice(i),
                ];
                return newValues;
              });
            }}
          />
        ))}
        {handles.map(({ value, active, getHandleProps }, i) => (
          <button
            {...getHandleProps({
              style:
                selectedHandle === i
                  ? {
                      appearance: 'none',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      //borderBottom: "1px solid black"
                      //borderTop: "1px solid black"
                    }
                  : {
                      appearance: 'none',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      //borderTop: "none",
                      //borderBottom: "none"
                    },
            })}
            onPointerDown={() => {
              setSelectedSegment(i);
              setSelectedHandle(i);
            }}
            onDoubleClick={() => {
              setValues((prev) => {
                if (prev.length === 1) return [];
                return prev.filter((_, index) => index !== i);
              });
            }}
            key={i}
          >
            <Handle
              style={
                selectedHandle === i
                  ? {
                      //border: "1px solid black",
                      //opacity: 0.7,
                      position: 'relative',
                      bottom: i & (1 > 0) ? 17 : -10,
                      color: 'white',
                    }
                  : {
                      position: 'relative',
                      bottom: i & (1 > 0) ? 17 : -10,
                      background: 'none',
                      color: 'yellow',
                    }
              }
              active={active}
            >
              {value}
            </Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <pre
        style={{
          display: 'inline-block',
          textAlign: 'left',
        }}
      >
        <code>
          {JSON.stringify({
            values,
            selectedSegment,
            selectedHandle,
          })}
        </code>
      </pre>
    </div>
  );
};

export default Segments;
