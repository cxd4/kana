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
    case "1":
        return unitohtml(0x4E00); /* N5 1st grade rank 2 "one" */
    case "2":
        return unitohtml(0x4E8C); /* N5 1st grade rank 9 "two" */
    case "3":
        return unitohtml(0x4E09); /* N5 1st grade rank 14 "three" */
    case "4":
        return unitohtml(0x56DB); /* N5 1st grade rank 47 "four" */
    case "5":
        return unitohtml(0x4E94); /* N5 1st grade rank 31 "five" */
    case "6":
        return unitohtml(0x516D); /* N5 1st grade rank 93 "six" */
    case "7":
        return unitohtml(0x4E03); /* N5 1st grade rank 115 "seven" */
    case "8":
        return unitohtml(0x516B); /* N5 1st grade rank 92 "eight" */
    case "9":
        return unitohtml(0x4E5D); /* N5 1st grade rank 55 "nine" */
    case "nichi":
        return unitohtml(0x65E5); /* N5 1st grade rank 1 "day, sun, Japan" */
    case "naka": // NOT the "relationship" kind...might make that one "naka2".
        return unitohtml(0x4E2D); /* N5 1st grade rank 11 "inside, middle" */
    case "gatsu":
        return unitohtml(0x6708); /* N5 1st grade rank 23 "month, moon" */
    case "ue":
        return unitohtml(0x4E0A); /* N5 1st grade rank 35 "up, above..." */
    case "kuda":
        return unitohtml(0x4E0B); /* N5 1st grade rank 97 "down, below..." */
    case "okona":
        return unitohtml(0x884C); /* N5 2nd grade rank 20 "go, journey, ..." */
    case "yama":
        return unitohtml(0x5C71); /* N5 1st grade rank 131 "mountain" */
    case "-mono": // rarely used without a prefix qualifier, hence the `-'
        return unitohtml(0x8005); /* N4 3rd grade rank 38 "[...]person" */
    case "mono":
        return unitohtml(0x7269); /* N4 3rd grade rank 215 "object, matter" */
    case "nani":
        return unitohtml(0x4F55); /* N5 2nd grade rank 340 "what" */
    case "aida":
        return unitohtml(0x9593); /* N5 2nd grade rank 33 "gap, between..." */
    case "atara":
        return unitohtml(0x65B0); /* N4 2nd grade rank 51 "new" */
    case "-kai": // most likely to be used as a counting suffix
        return unitohtml(0x56DE); /* N3 2nd grade rank 50 "round, revolve..." */
    case "hidari":
        return unitohtml(0x5DE6); /* N5 1st grade rank 630 "left" */
    case "migi":
        return unitohtml(0x53F3); /* N5 1st grade rank 602 "right" */
    case "onna":
        return unitohtml(0x5973); /* N1 1st grade rank 151 "woman, female" */
    case "otoko":
        return unitohtml(0x7537); /* N1 1st grade rank 240 "man, male" */
    case "chika-": // usually either chikaku or chikai
        return unitohtml(0x8FD1); /* N4 2nd grade rank 194 "nearby, akin..." */
    case "iro":
        return unitohtml(0x8272); /* N4 2nd grade rank 621 "color" */
    case "matsurigoto":
        return unitohtml(0x653F); /* N3 5th grade rank 17 "politics, gov't" */
    case "rai-":
        return unitohtml(0x6765); /* N5 2nd grade rank 102 "next/due, come" */
    case "higashi":
        return unitohtml(0x6771); /* N5 2nd grade rank 37 "East" */
    case "kita":
        return unitohtml(0x5317); /* N5 2nd grade rank 153 "North" */
    case "nishi":
        return unitohtml(0x897F); /* N5 2nd grade rank 259 "West" */
    case "minami":
        return unitohtml(0x5357); /* N5 2nd grade rank 341 "South" */
    case "watakushi":
        return unitohtml(0x79C1); /* N4 6th grade rank 242 "I, me, private" */
    case "machi":
        return unitohtml(0x753A); /* N4 1st grade rank 292 "town, city" */
    case "tsune":
        return unitohtml(0x5E38); /* N3 5th grade rank 293 "usual/regular" */
    case "futata":
        return unitohtml(0x518D); /* N2 5th grade rank 275 "again/twice" */
    case "itona":
        return unitohtml(0x55B6); /* N2 5th grade rank 303 "conduct business */
    case "muzuka":
        return unitohtml(0x96E3); /* N3 6th grade rank 330 "difficult", ... */
    case "hatara":
        return unitohtml(0x50CD); /* N3 4th grade rank 417 "work" */
    case "atama":
        return unitohtml(0x982D); /* N3 2nd grade rank 433 "head, animal ctr" */
    case "otouto":
        return unitohtml(0x5F1F); /* N4 2nd grade rank 1161 "younger brother" */
    case "imouto":
        return unitohtml(0x59B9); /* N4 2nd grade rank 1446 "younger sister" */
    case "ani":
        return unitohtml(0x5144); /* N4 2nd grade rank 1219 "elder brother" */
    case "ane":
        return unitohtml(0x59C9); /* N4 2nd grade rank 1473 "elder sister" */
    case "hitai":
        return unitohtml(0x984D); /* N2 5th grade rank 407 "brow, amount, ... */
    case "ushina":
        return unitohtml(0x5931); /* N3 4th grade rank 447 "loss, fault, ..." */
    case "minato":
        return unitohtml(0x6E2F); /* N3 3rd grade rank 495 "harbor (or port)" */
    case "uketamawa":
        return unitohtml(0x627F); /* N2 5th grade rank 775 "acquiesce/hear... */
    case "yashina":
        return unitohtml(0x990A); /* N1 4th grade rank 888 "foster/nurture" */
    case "kokoroza":
    case "kokorozashi":
        return unitohtml(0x5FD7); /* N1 5th grade rank 823 "plan, aspire, ... */
    case "yume":
        return unitohtml(0x5922); /* N3 5th grade rank 943 "dream" */
    case "nuno":
        return unitohtml(0x5E03); /* N2 5th grade rank 877 "linen/cloth, ..." */
    case "hone":
        return unitohtml(0x9AA8); /* N2 6th grade rank 936 "bone, remains..." */
    case "tawara":
        return unitohtml(0x4FF5); /* N1 5th grade rank 1481 "sack, straw bag" */
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
