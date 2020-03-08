/*
 * @licstart    The following is the entire license notice for the
 * JavaScript code in this file.
 *
 * Kana Translator:  portable ASCII-to-kana conversion library
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

function is_single(letter) {
    "use strict";
    switch (letter) {
        case "A": case "a":
        case "I": case "i":
        case "U": case "u":
        case "E": case "e":
        case "O": case "o":
        case "N": case "n": /* singles = vowels + the `n' consonant */
            return true;
    }
    return false;
}

var combo_ext = false;
function sound_from_vowel(consonant, vowel, gap) {
    "use strict";
    combo_ext = false;

    switch (vowel) {
    case "a":
        return (consonant);
    case "u":
        return (consonant + 2 * gap);
    case "e":
        return (consonant + 3 * gap);
    case "o":
        return (consonant + 4 * gap);

    case "y": /* ...and sometimes I use 'Y', too. :) */
        combo_ext = true;
        /* Fall through. */
    case "i":
        return (consonant + 1 * gap);
    }
    return 0;
}
function combo_from_vowel(ext, kata_flag) {
    "use strict";
    combo_ext = false;

    switch (ext) {
    case "a":
        return (HIRA_ya + 96 * kata_flag);
    case "u":
        return (HIRA_yu + 96 * kata_flag);
    case "o":
        return (HIRA_yo + 96 * kata_flag);

    /* Possibly flag these and return 0 instead. */
    case "i":
        return (HIRA_yi + 96 * kata_flag);
    case "e":
        return (HIRA_ye + 96 * kata_flag);
    }
    return 0;
}

var ascii_in = 0;
function a_to_kana(syllable) {
    "use strict";
    ascii_in = 0;
    if (syllable == null) {
        return null;
    }

    ascii_in = 1;
    switch (syllable[0]) {
    case " ":
    case "_":
        return 32;
    case "-":
        return 0;
    case ".":  return 0x3002;
    case ",":  return 0x3001;

    case "a":
        return HIRA_A;
    case "i":
        return HIRA_I;
    case "u":
        return HIRA_U;
    case "e":
        return HIRA_E;
    case "o":
        return HIRA_O; /* We'll have to handle "wo" externally.... */
    case "n":
        var extension = sound_from_vowel(HIRA_NA, syllable[1], 1);
        if (extension === 0) {
            ascii_in = 1;
            return HIRA_N;
        }
        ascii_in = 2;
        return (extension);

/*
 * I feel it best to reserve capitalized romaji syllables to refer to
 * katakana.  We need a way to tell apart user requests to print hiragana
 * letters and requests to print katakana ones.
 *
 * Since English grammar needs proper nouns (i.e. names, places and other
 * entities not internalized to the Japanese language) to be capitalized,
 * we can assume that capitalized proper nouns in English may have some
 * context preserved in romaji by starting the romaji with capital letters.
 */
    case "A":
        return KATA_A;
    case "I":
        return KATA_I;
    case "U":
        return KATA_U;
    case "E":
        return KATA_E;
    case "O":
        return KATA_O;
    case "N":
        var extension = sound_from_vowel(KATA_NA, tolower(syllable[1]), 1);
        if (extension === 0) {
            ascii_in = 1;
            return KATA_N;
        }
        ascii_in = 2;
        return (extension);

/*
 * Try to get most of the katakana-specific syllables out of the way.
 * These sounds are not native Japanese and do not exist in hiragana.
 */
    case "D":
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case "I":  return KATA_DI;
        case "Y":
            ascii_in = 3;
            return (toupper(syllable[2]) === "U" ? KATA_DYU : 0);
        case "A":  return KATA_DA;
        case "E":  return KATA_DE;
        case "O":  return KATA_DO;
        case "U":  return 0;
        }
    case "F":
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case "A":  return KATA_FA;
        case "I":  return KATA_FI;
        case "E":  return KATA_FE;
        case "O":  return KATA_FO;

        case "Y":
            ascii_in = 3;
            return (toupper(syllable[2]) == "U" ? KATA_FYU : 0);
        case "U":  return KATA_FU; /* DOES exist in hiragana ("hu") */
        }
        return ERR_BROKEN_ROMAJI;
    case "T":
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case "I":  return KATA_TI;
        case "S":
            ascii_in = 3;
            switch (toupper(syllable[2])) {
            case "A":  return KATA_TSA;
            case "I":  return KATA_TSI;
            case "E":  return KATA_TSE;
            case "O":  return KATA_TSO;

            case "U":  return KATA_TSU; /* DOES exist in hiragana */
            default:  return 0;
            }

    /* The rest of these all exist as native sounds also in hiragana. */
        case "A":  return KATA_TA;
        case "E":  return KATA_TE;
        case "O":  return KATA_TO;
        case "U":  return 0;
        }
        return 0;
    case "V":
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case "U":  return KATA_VU; /* Native Japanese speakers use "BU" */
        case "A":  return KATA_VA;
        case "I":  return KATA_VI;
        case "E":  return KATA_VE;
        case "O":  return KATA_VO;
        }
        return 0;
    case "W":
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case "I":  return KATA_WI;
        case "E":  return KATA_WE;
        case "O":  return KATA_W_O;

        case "A":  return KATA_WA; /* DOES exist in hiragana */
        case "U":  return KATA_WU;
        }
        return 0;

/*
 * PHEW!  Now let's focus on only the hiragana, natively present subset of
 * sounds actually present in the Japanese language.
 */
    case "d":
        var base = sound_from_vowel(HIRA_DA, syllable[1], 2);
        ascii_in = 2;
        return (base > HIRA_DI ? base + 1 : base);
    case "f":
        ascii_in = 2;
        return (syllable[1] == "u" ? HIRA_FU : 0);
    case "t":
        ascii_in = 2;
        switch (syllable[1]) {
        case "a":  return HIRA_TA;
        case "s":
            ascii_in = 3;
            return (syllable[2] == "u" ? HIRA_TSU : 0);
        case "e":  return HIRA_TE;
        case "o":  return HIRA_TO;
        }
        return 0;
    case "w":
        ascii_in = 2;
        switch (syllable[1]) {
        case "a":  return HIRA_WA;
        case "i":  return HIRA_WI;
        case "u":  return HIRA_WU;
        case "e":  return HIRA_WE;
        case "o":  return HIRA_W_O; /* deprecated; use " o " with spaces */
        }
        return 0;

/*
 * Now that just leaves the rows that share the same presence of syllables
 * in both katakana and hiragana together, making the rest of this function
 * simple to implement (except for that fucking 'N' sound maybe... to do).
 */
    case "k":
        ascii_in = 2;
        return sound_from_vowel(HIRA_KA, syllable[1], 2);
    case "K":
        ascii_in = 2;
        return sound_from_vowel(KATA_KA, tolower(syllable[1]), 2);

    case "s":
        ascii_in = 2;
        switch (syllable[1]) {
        case "a":  return HIRA_SA;
        case "h":
            ascii_in = 3;
            switch (syllable[2]) {
            case "a":
                return HIRA_SHA;
            case "i":
                return HIRA_SHI;
            case "u":
                return HIRA_SHU;
            case "e":
                return 0;
            case "o":
                return HIRA_SHO;
            }
            return 0;
        case "i":  return ERR_LOST_SYLLABLE;
        case "u":  return HIRA_SU;
        case "e":  return HIRA_SE;
        case "o":  return HIRA_SO;
        }
        return 0;
    case "S":
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case "A":  return KATA_SA;
        case "H":
            ascii_in = 3;
            switch (toupper(syllable[2])) {
            case "A":
                return KATA_SHA;
            case "I":
                return KATA_SHI;
            case "U":
                return KATA_SHU;
            case "E":
                return 0;
            case "O":
                return KATA_SHO;
            }
            return 0;
        case "I":  return ERR_LOST_SYLLABLE;
        case "U":  return KATA_SU;
        case "E":  return KATA_SE;
        case "O":  return KATA_SO;
        }
        return 0;

    case "c":
        ascii_in = 3;
        if (syllable[1] !== "h") {
            return 0;
        }
        switch (syllable[2]) {
        case "a":  return HIRA_CHA;
        case "i":  return HIRA_CHI;
        case "u":  return HIRA_CHU;
        case "e":  return 0;
        case "o":  return HIRA_CHO;
        }
        return 0;
    case "C":
        ascii_in = 3;
        if (toupper(syllable[1]) !== "H") {
            return 0;
        }
        switch (toupper(syllable[2])) {
        case "A":  return KATA_CHA;
        case "I":  return KATA_CHI;
        case "U":  return KATA_CHU;
        case "E":  return KATA_CHE;
        case "O":  return KATA_CHO;
        }
        return 0;

    case "h":
        ascii_in = 2;
        if (combo_ext) {
            return combo_from_vowel(syllable[1], 0);
        }
        return sound_from_vowel(HIRA_HA, syllable[1], 3);
    case "H":
        ascii_in = 2;
        if (combo_ext) {
            return combo_from_vowel(tolower(syllable[1]), 1);
        }
        return sound_from_vowel(KATA_HA, tolower(syllable[1]), 3);

    case "m":
        ascii_in = 2;
        return sound_from_vowel(HIRA_MA, syllable[1], 1);
    case "M":
        ascii_in = 2;
        return sound_from_vowel(KATA_MA, tolower(syllable[1]), 1);

    case "r":
        ascii_in = 2;
        return sound_from_vowel(HIRA_RA, syllable[1], 1);
    case "R":
        ascii_in = 2;
        return sound_from_vowel(KATA_RA, tolower(syllable[1]), 1);

    case "y":
        ascii_in = 2;
        if (combo_ext) {
            return combo_from_vowel(syllable[1], 0);
        }
        switch (syllable[1]) {
        case "a":  return HIRA_YA;
        case "i":  return HIRA_YI;
        case "u":  return HIRA_YU;
        case "e":  return HIRA_YE;
        case "o":  return HIRA_YO;
        }
        return 0;
    case "Y":
        ascii_in = 2;
        if (combo_ext) {
            return combo_from_vowel(tolower(syllable[1]), 1);
        }
        switch (toupper(syllable[1])) {
        case "A":  return KATA_YA;
        case "I":  return KATA_YI;
        case "U":  return KATA_YU;
        case "E":  return KATA_YE;
        case "O":  return KATA_YO;
        }
        return 0;

    case "g":
        ascii_in = 2;
        return sound_from_vowel(HIRA_GA, syllable[1], 2);
    case "G":
        ascii_in = 2;
        return sound_from_vowel(KATA_GA, tolower(syllable[1]), 2);
    case "z":
        ascii_in = 2;
        return sound_from_vowel(HIRA_ZA, syllable[1], 2);
    case "Z":
        ascii_in = 2;
        return sound_from_vowel(KATA_ZA, tolower(syllable[1]), 2);
    case "b":
        ascii_in = 2;
        return sound_from_vowel(HIRA_BA, syllable[1], 3);
    case "B":
        ascii_in = 2;
        return sound_from_vowel(KATA_BA, tolower(syllable[1]), 3);
    case "p":
        ascii_in = 2;
        return sound_from_vowel(HIRA_PA, syllable[1], 3);
    case "P":
        ascii_in = 2;
        return sound_from_vowel(KATA_PA, tolower(syllable[1]), 3);

    case "j":
        ascii_in = 2;
        switch (syllable[1]) {
            case "a":  return HIRA_JA;
            case "i":  return HIRA_JI;
            case "u":  return HIRA_JU;
            case "e":  return HIRA_JE;
            case "o":  return HIRA_JO;
        }
        return 0;
    case "J":
        ascii_in = 2;
        switch (toupper(syllable[1])) {
            case "A":  return KATA_JA;
            case "I":  return KATA_JI;
            case "U":  return KATA_JU;
            case "E":  return KATA_JE;
            case "O":  return KATA_JO;
        }
        return 0;
    }
    return 0;
}

function rtok(ascii) {
    "use strict";
    var i = 0;
    var x1 = -1;
    var x2 = -1;

    var codepoint;
    var mlif = document;
    var ascii = mlif.getElementById("romaji").value;
    var kana = mlif.getElementById("kana");

    while (!(toupper(ascii[i]) >= "A" && toupper(ascii[i]) <= "Z")) {
        i += 1;
    }
    while (i < ascii.length) {
        var katakana_flag = false;
        if (!(toupper(ascii[i]) >= "A" && toupper(ascii[i]) <= "Z")) {
            x2 = x1;
            while (x1 < i) {
                if (ascii[x1] >= "A" && ascii[x1] <= "Z") {
                    katakana_flag = true;
                }
                x1 += 1;
            }
            if (katakana_flag) {
                while (x2 < i) {
                    ascii = setCharAt(ascii, x2, toupper(ascii[x2]));
                    x2 += 1;
                }
            }
        } else if (toupper(ascii[i]) >= "A" && toupper(ascii[i]) <= "Z" && x1 < 0) {
            x1 = i;
        }
        i += 1;
    }

    kana.innerHTML = "";
    i = 0;
    while (i < ascii.length) {
        if (ascii[i] === ascii[i + 1] && !is_single(ascii[i])) {
            if (ascii[i] >= "A" && ascii[i] <= "Z") {
                kana.innerHTML += unitohtml(KATA_tsu);
            } else if (ascii[i] >= "a" && ascii[i] <= "z") {
                kana.innerHTML += unitohtml(HIRA_tsu);
            }
            i += 1;
            continue;
        }

        codepoint = a_to_kana(ascii.substring(i));
        switch (codepoint) {
        case 32:
            i += 1;
            if (ascii[i - 2] < "A" || ascii[i - 2] > "Z") {
                kana.innerHTML += " ";
                break;
            }
            if (ascii[i] < "A" || ascii[i] > "Z") {
                kana.innerHTML += " ";
                break;
            }
            kana.innerHTML += unitohtml(0x30FB);
            break; /* katakana middle dot to connect foreign words */
        case HIRA_WA:
            if (ascii[i - 1] === " " && ascii[i + 2] === " ") {
                codepoint = HIRA_HA;
            }
            kana.innerHTML += unitohtml(codepoint);
            i += 2;
            break;
        case HIRA_O:
            if (ascii[i - 1] === " " && ascii[i + 1] === " ") {
                codepoint = HIRA_W_O;
            }
            kana.innerHTML += unitohtml(codepoint);
            i += 1;
            break;
        case HIRA_E:
            if (ascii[i - 1] === " " && ascii[i + 1] === " ") {
                codepoint = HIRA_HE;
            }
            kana.innerHTML += unitohtml(codepoint);
            i += 1;
            break;

        case KATA_I:
            if (ascii[i - 1] === ascii[i] || ascii[i - 1] === "E") {
                codepoint = 0x30FC;
            }
            kana.innerHTML += unitohtml(codepoint);
            i += 1;
            break;
        case KATA_U:
            if (ascii[i - 1] === ascii[i] || ascii[i - 1] === "O") {
                codepoint = 0x30FC;
            }
            kana.innerHTML += unitohtml(codepoint);
            i += 1;
            break;
        case KATA_A:
        case KATA_E:
        case KATA_O:
            if (ascii[i - 1] === ascii[i]) {
                codepoint = 0x30FC;
            }
            kana.innerHTML += unitohtml(codepoint);
            i += 1;
            break;

/*
 * The remainder of the switch is to adjust for combo letters.
 */
        case HIRA_CHA:
            kana.innerHTML += unitohtml(HIRA_CHI);
            kana.innerHTML += unitohtml(HIRA_ya);
            i += 3;
            break;
        case HIRA_CHU:
            kana.innerHTML += unitohtml(HIRA_CHI);
            kana.innerHTML += unitohtml(HIRA_yu);
            i += 3;
            break;
        case HIRA_CHO:
            kana.innerHTML += unitohtml(HIRA_CHI);
            kana.innerHTML += unitohtml(HIRA_yo);
            i += 3;
            break;
        case KATA_CHA:
            kana.innerHTML += unitohtml(KATA_CHI);
            kana.innerHTML += unitohtml(KATA_ya);
            i += 3;
            break;
        case KATA_CHU:
            kana.innerHTML += unitohtml(KATA_CHI);
            kana.innerHTML += unitohtml(KATA_yu);
            i += 3;
            break;
        case KATA_CHE:
            kana.innerHTML += unitohtml(KATA_CHI);
            kana.innerHTML += unitohtml(KATA_e);
            i += 3;
            break;
        case KATA_CHO:
            kana.innerHTML += unitohtml(KATA_CHI);
            kana.innerHTML += unitohtml(KATA_yo);
            i += 3;
            break;

        case KATA_DI:
            kana.innerHTML += unitohtml(KATA_DE);
            kana.innerHTML += unitohtml(KATA_i);
            i += 2;
            break;
        case KATA_DYU:
            kana.innerHTML += unitohtml(KATA_DE);
            kana.innerHTML += unitohtml(KATA_yu);
            i += 3;
            break;
        case HIRA_JA:
            kana.innerHTML += unitohtml(HIRA_JI);
            kana.innerHTML += unitohtml(HIRA_ya);
            i += 2;
            break;
        case HIRA_JU:
            kana.innerHTML += unitohtml(HIRA_JI);
            kana.innerHTML += unitohtml(HIRA_yu);
            i += 2;
            break;
        case HIRA_JO:
            kana.innerHTML += unitohtml(HIRA_JI);
            kana.innerHTML += unitohtml(HIRA_yo);
            i += 2;
            break;

        case KATA_FA:
            kana.innerHTML += unitohtml(KATA_FU);
            kana.innerHTML += unitohtml(KATA_a);
            i += 2;
            break;
        case KATA_FI:
            kana.innerHTML += unitohtml(KATA_FU);
            kana.innerHTML += unitohtml(KATA_i);
            i += 2;
            break;
        case KATA_FE:
            kana.innerHTML += unitohtml(KATA_FU);
            kana.innerHTML += unitohtml(KATA_e);
            i += 2;
            break;
        case KATA_FO:
            kana.innerHTML += unitohtml(KATA_FU);
            kana.innerHTML += unitohtml(KATA_o);
            i += 2;
            break;
        case KATA_WA:
            if (ascii[i + 2] === "\"") {
                kana.innerHTML += unitohtml(KATA_VA);
                i += 3;
                break;
            }
            kana.innerHTML += unitohtml(KATA_WA);
            i += 2;
            break;
        case KATA_WI:
            if (ascii[i + 2] === "\"") {
                kana.innerHTML += unitohtml(KATA_VI);
                i += 3;
                break;
            }
            kana.innerHTML += unitohtml(KATA_U);
            kana.innerHTML += unitohtml(KATA_i);
            i += 2;
            break;
        case KATA_WE:
            if (ascii[i + 2] === "\"") {
                kana.innerHTML += unitohtml(KATA_VE);
                i += 3;
                break;
            }
            kana.innerHTML += unitohtml(KATA_U);
            kana.innerHTML += unitohtml(KATA_e);
            i += 2;
            break;
        case KATA_W_O:
            if (ascii[i + 2] === "\"") {
                kana.innerHTML += unitohtml(KATA_VO);
                i += 3;
                break;
            }
            kana.innerHTML += unitohtml(KATA_W_O);
            i += 2;
            break;
        case KATA_VI:
            kana.innerHTML += unitohtml(KATA_VU);
            kana.innerHTML += unitohtml(KATA_i);
            i += 2;
            break;
        case KATA_VE:
            kana.innerHTML += unitohtml(KATA_VU);
            kana.innerHTML += unitohtml(KATA_e);
            i += 2;
            break;

        default:
            if (codepoint == 0) {
                if (ascii[i] === "\n") {
                    kana.innerHTML += "<br>";
                } else if (ascii[i] !== "-") {
                    kana.innerHTML += ascii[i];
                }
                i += 1;
            } else {
                kana.innerHTML += unitohtml(codepoint);
                i += (combo_ext ? 1 : ascii_in);
            }
        }
    }
    mlif.getElementById("ft").href = "https://translate.google.com/#view=home&";
    mlif.getElementById("ft").href += "op=translate&sl=ja&tl=en&text=";
    mlif.getElementById("ft").href += kana.innerHTML;
    return;
}
