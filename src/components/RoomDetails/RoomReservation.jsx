import { useState } from "react";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";
import { differenceInCalendarDays } from "date-fns";

import Button from "../Shared/Button/Button";

const RoomReservation = ({ room }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(room?.from),
      endDate: new Date(room?.to),
      key: "selection",
    },
  ]);
  const totalDays = parseInt(
    differenceInCalendarDays(new Date(room?.to), new Date(room?.from))
  );
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">/night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <DateRange
          rangeColors={["#F6536D"]}
          // editableDateInputs={true}
          onChange={() => {
            setState([
              {
                startDate: new Date(room?.from),
                endDate: new Date(room?.to),
                key: "selection",
              },
            ]);
          }}
          moveRangeOnFirstSelection={true}
          ranges={state}
          minDate={new Date(room?.from)}
          maxDate={new Date(room?.to)}
          showDateDisplay={false}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button label={"Reserve"} />
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${room?.price * totalDays}</div>
      </div>
    </div>
  );
};

RoomReservation.propTypes = {
  room: PropTypes.object,
};

export default RoomReservation;
