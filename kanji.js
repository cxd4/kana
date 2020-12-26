/*
 * @licstart    The following is the entire license notice for the
 * JavaScript code in this file.
 *
 * Kanji from Romanization:  portable ASCII-to-kana conversion library
 * Copyright (C) 2020 rjs
 *
 * This program is free software:  you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @licend      The above is the entire license notice for the JavaScript
 * code in this file.
 */

/*
 * This function (and the entire file) will be divided into two parts.
 * The first half is the decoding of single-kanji Romanizations.
 * The second half are unique Romanizations to unambiguous multi-kanji terms.
 */
function kanji_extract(ascii) {
    "use strict";
    switch (ascii) {
    case "nichi":
        return unitohtml(0x65E5); /* N5 1st grade rank 1 "day, sun, Japan" */
    case "gatsu":
        return unitohtml(0x6708); /* N5 1st grade rank 23 "month, moon" */
    case "okona":
        return unitohtml(0x884C); /* N5 2nd grade rank 20 "go, journey, ..." */
    case "yama":
        return unitohtml(0x5C71); /* N5 1st grade rank 131 "mountain" */
    case "watakushi":
        return unitohtml(0x79C1); /* N4 1st grade rank 242 "I, me, private" */
    case "NOMA":
        return unitohtml(0x3005); /* kanji repetition mark */

/*
 * The rest of this file are Romanizations of multi-kanji vocabulary.
 */
    case "oshiri":
        return (unitohtml(HIRA_O) + unitohtml(0x5C3B));
    case "watashi":
        return (unitohtml(0x6E21) + unitohtml(HIRA_SHI)); /* ferry (boat) */
    }
    return undefined; /* Revert back to kana-only mode until next request. */
}
