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

function kanji_xcode(ascii) {
    "use strict";

    switch (ascii) {
    case "1":
        return 0x4E00; /* N5 1st grade rank 2 "one" */
    case "2":
        return 0x4E8C; /* N5 1st grade rank 9 "two" */
    case "3":
        return 0x4E09; /* N5 1st grade rank 14 "three" */
    case "4":
        return 0x56DB; /* N5 1st grade rank 47 "four" */
    case "5":
        return 0x4E94; /* N5 1st grade rank 31 "five" */
    case "6":
        return 0x516D; /* N5 1st grade rank 93 "six" */
    case "7":
        return 0x4E03; /* N5 1st grade rank 115 "seven" */
    case "8":
        return 0x516B; /* N5 1st grade rank 92 "eight" */
    case "9":
        return 0x4E5D; /* N5 1st grade rank 55 "nine" */
    case "10":
        return 0x5341; /* N5 1st grade rank 8 "ten" */
    case "100":
        return 0x767E; /* N5 1st grade rank 163 "hundred" */
    case "1000":
        return 0x5343; /* N5 1st grade rank 195 "thousand" */
    case "10000":
    case "yorozu":
        return 0x4E07; /* N5 2nd grade rank 375 "ten thousand" */
    case "nichi":
        return 0x65E5; /* N5 1st grade rank 1 "day, sun, Japan" */
    case "naka": // NOT the "relationship" kind...might make that one "naka2".
        return 0x4E2D; /* N5 1st grade rank 11 "inside, middle" */
    case "gatsu":
        return 0x6708; /* N5 1st grade rank 23 "month, moon" */
    case "~jin":
        return 0x4EBA; /* N5 1st grade rank 5 "person" */
    case "~ji":
        return 0x6642; /* N5 2nd grade rank 16 "time, hour" */
    case "yen":
        return 0x5186; /* N5 1st grade rank 69 "yen, circle/round" */
    case "~go":
        return 0x8A9E; /* N5 2nd grade rank 301 "word/speech/lang" */
    case "-ji":
        return 0x5B57; /* N4 1st grade rank 485 "char/letter/word" */
    case "ue":
        return 0x4E0A; /* N5 1st grade rank 35 "up, above..." */
    case "kuda":
        return 0x4E0B; /* N5 1st grade rank 97 "down, below..." */
    case "okona":
        return 0x884C; /* N5 2nd grade rank 20 "go, journey, ..." */
    case "i-u":
        return 0x8A00; /* N4 2nd grade rank 83 "say, word" */
    case "omo-u":
        return 0x601D; /* N4 2nd grade rank 132 "think" */
    case "yama":
        return 0x5C71; /* N5 1st grade rank 131 "mountain" */
    case "-mono": // rarely used without a prefix qualifier, hence the `-'
        return 0x8005; /* N4 3rd grade rank 38 "[...]person" */
    case "mono":
        return 0x7269; /* N4 3rd grade rank 215 "object, matter" */
    case "nani":
        return 0x4F55; /* N5 2nd grade rank 340 "what" */
    case "aida":
        return 0x9593; /* N5 2nd grade rank 33 "gap, between..." */
    case "atara":
        return 0x65B0; /* N4 2nd grade rank 51 "new" */
    case "-kai": // most likely to be used as a counting suffix
        return 0x56DE; /* N3 2nd grade rank 50 "round, revolve..." */
    case "hidari":
        return 0x5DE6; /* N5 1st grade rank 630 "left" */
    case "migi":
        return 0x53F3; /* N5 1st grade rank 602 "right" */
    case "onna":
        return 0x5973; /* N1 1st grade rank 151 "woman, female" */
    case "otoko":
        return 0x7537; /* N1 1st grade rank 240 "man, male" */
    case "chika-": // usually either chikaku or chikai
        return 0x8FD1; /* N4 2nd grade rank 194 "nearby, akin..." */
    case "iro":
        return 0x8272; /* N4 2nd grade rank 621 "color" */
    case "matsurigoto":
        return 0x653F; /* N3 5th grade rank 17 "politics, gov't" */
    case "rai-":
        return 0x6765; /* N5 2nd grade rank 102 "next/due, come" */
    case "higashi":
        return 0x6771; /* N5 2nd grade rank 37 "East" */
    case "kita":
        return 0x5317; /* N5 2nd grade rank 153 "North" */
    case "nishi":
        return 0x897F; /* N5 2nd grade rank 259 "West" */
    case "minami":
        return 0x5357; /* N5 2nd grade rank 341 "South" */
    case "watashi":
    case "watakushi":
        return 0x79C1; /* N4 6th grade rank 242 "I, me, private" */
    case "machi":
        return 0x753A; /* N4 1st grade rank 292 "town, city" */
    case "tsune":
        return 0x5E38; /* N3 5th grade rank 293 "usual/regular" */
    case "futata":
        return 0x518D; /* N2 5th grade rank 275 "again/twice" */
    case "itona":
        return 0x55B6; /* N2 5th grade rank 303 "conduct business */
    case "muzuka":
        return 0x96E3; /* N3 6th grade rank 330 "difficult", ... */
    case "hatara":
        return 0x50CD; /* N3 4th grade rank 417 "work" */
    case "atama":
        return 0x982D; /* N3 2nd grade rank 433 "head, animal ctr" */
    case "moku":
        return 0x6728; /* N5 1st grade rank 317 "wood, tree" */
    case "ka-":
        return 0x706B; /* N5 1st grade rank 574 "fire" */
    case "do-":
        return 0x571F; /* N5 1st grade rank 307 "earth, ground/soil..." */
    case "kin":
        return 0x91D1; /* N5 1st grade rank 53 "gold (metal)" */
    case "mizu":
        return 0x6C34; /* N5 1st grade rank 223 "water" */
    case "otouto":
        return 0x5F1F; /* N4 2nd grade rank 1161 "younger brother" */
    case "imouto":
        return 0x59B9; /* N4 2nd grade rank 1446 "younger sister" */
    case "ani":
        return 0x5144; /* N4 2nd grade rank 1219 "elder brother" */
    case "ane":
        return 0x59C9; /* N4 2nd grade rank 1473 "elder sister" */
    case "hitai":
        return 0x984D; /* N2 5th grade rank 407 "brow, amount, ... */
    case "ushina":
        return 0x5931; /* N3 4th grade rank 447 "loss, fault, ..." */
    case "minato":
        return 0x6E2F; /* N3 3rd grade rank 495 "harbor (or port)" */
    case "uketamawa":
        return 0x627F; /* N2 5th grade rank 775 "acquiesce/hear... */
    case "yashina":
        return 0x990A; /* N1 4th grade rank 888 "foster/nurture" */
    case "kokoroza":
    case "kokorozashi":
        return 0x5FD7; /* N1 5th grade rank 823 "plan, aspire, ... */
    case "yume":
        return 0x5922; /* N3 5th grade rank 943 "dream" */
    case "nuno":
        return 0x5E03; /* N2 5th grade rank 877 "linen/cloth, ..." */
    case "hone":
        return 0x9AA8; /* N2 6th grade rank 936 "bone, remains..." */
    case "tawara":
        return 0x4FF5; /* N1 5th grade rank 1481 "sack, straw bag" */
    case "kuso":
        return 0x7CDE;
    case "NOMA":
        return 0x3005; /* kanji repetition mark */
    }

    return -1;
}

function kanji_extract(ascii) {
    "use strict";
    var unicode_reply;

    unicode_reply = kanji_xcode(ascii);
    if (unicode_reply < 0) {
        return (undefined); /* Revert to kana-only parsing till next request. */
    }
    return unitohtml(unicode_reply);
}

function vocab_extract(ascii) {
    "use strict";

    switch (ascii) {
    case "okane":
        return (unitohtml(HIRA_O) + unitohtml(0x91D1));
    case "oshiri":
        return (unitohtml(HIRA_O) + unitohtml(0x5C3B));
    case "tabe":
        return (unitohtml(0x98DF) + unitohtml(HIRA_BE));
    case "watashi":
        return (unitohtml(0x6E21) + unitohtml(HIRA_SHI)); /* ferry (boat) */
    case "youbi":
        return (unitohtml(0x66DC) + unitohtml(0x65E5));
    }

    return (undefined);
}
