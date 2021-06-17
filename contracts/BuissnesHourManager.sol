// SPDX-License-Identifier: MIT

pragma solidity >=0.5.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./datetime/contracts/api.sol";
import "./datetime/contracts/DateTime.sol";

contract BuissnesHourManager {
    enum WeekDayType {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    }
    WeekDayType internal types;

    struct BuissnesDay {
        WeekDayType weekday;
        uint8 startHour;
        uint8 endHour;
    }

    DateTimeAPI internal dateTime;
    mapping(bytes32 => BuissnesDay[7]) internal buissnesDays;

    constructor() public {
        dateTime = new DateTime();
    }

    function setBuissnesHours(
        bytes32 key,
        uint8 weekDayType,
        uint8 startHour,
        uint8 endHour
    ) internal {
        require(
            weekDayType <= uint8(WeekDayType.sunday),
            "WRONG_WEEKDAY_INPUT"
        );
        require(startHour < 24, "START_HOURS_OUT_OF_BOUNDS");
        require(endHour < 24, "END_HOURS_OUT_OF_BOUNDS");
        buissnesDays[key][weekDayType].startHour = startHour;
        buissnesDays[key][weekDayType].endHour = endHour;
    }

    function getBuissnesHours(bytes32 key, uint8 weekDayType)
        external
        view
        returns (uint8 start, uint8 end)
    {
        require(
            weekDayType <= uint8(WeekDayType.sunday),
            "WRONG_WEEKDAY_INPUT"
        );
        return (
            buissnesDays[key][weekDayType].startHour,
            buissnesDays[key][weekDayType].endHour
        );
    }

    function initializeBuissnesHours(bytes32 key) internal {
        for (uint8 i = 0; i <= uint8(WeekDayType.sunday); i++)
            buissnesDays[key][i] = BuissnesDay(
                WeekDayType(i),
                uint8(0),
                uint8(24)
            );
    }

    function BuissnesHoursToTimeStamp(uint8 hour, uint8 minute)
        external
        view
        returns (uint256 timestamp)
    {
        return dateTime.toTimestamp(0, 0, 0, hour, minute);
    }
}
