function toupper(letter) {
    "use strict";
    return letter.toUpperCase();
}
function tolower(letter) {
    "use strict";
    return letter.toLowerCase();
}
function setCharAt(str,index,chr) {
    if (index > str.length - 1) {
        return (str);
    }
    return (str.substr(0, index) + chr + str.substr(index + 1));
}

function sound_from_vowel(consonant, vowel, gap) {
    "use strict";
    switch (vowel) {
    case 'a':
        return (consonant);
    case 'i':
        return (consonant + 1 * gap);
    case 'u':
        return (consonant + 2 * gap);
    case 'e':
        return (consonant + 3 * gap);
    case 'o':
        return (consonant + 4 * gap);
    }
    return 0;
}

function rtok(ascii, mlif) {
    "use strict";
    var i = 0;
    var x1 = -1;
    var x2 = -1;

    var codepoint;
    var kana = mlif.getElementById("kana");

    while (!(toupper(ascii[i]) >= 'A' && toupper(ascii[i]) <= 'Z')) {
        i += 1;
    }
    while (i < ascii.length) {
        var katakana_flag = false;
        if (!(toupper(ascii[i]) >= 'A' && toupper(ascii[i]) <= 'Z')) {
            x2 = x1;
            while (x1 < i) {
                if (ascii[x1] >= 'A' && ascii[x1] <= 'Z') {
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
        } else if (toupper(ascii[i]) >= 'A' && toupper(ascii[i]) <= 'Z' && x1 < 0) {
            x1 = i;
        }
        i += 1;
    }

    kana.innerHTML = "";
    i = 0;
    while (i < ascii.length) {
        codepoint = a_to_kana(ascii.substring(i));
        switch (codepoint) {
        case HIRA_WA:
            if (!(ascii[i - 1] >= 'a' && ascii[i + 2] <= 'z')) {
                codepoint = HIRA_HA;
            }
            kana.innerHTML += "&#" + codepoint + ";";
            i += 2;
            break;
        case HIRA_O:
            if (!(ascii[i - 1] >= 'a' && ascii[i + 2] <= 'z')) {
                codepoint = HIRA_W_O;
            }
            kana.innerHTML += "&#" + codepoint + ";";
            i += 1;
            break;
        case HIRA_E:
            if (!(ascii[i - 1] >= 'a' && ascii[i + 2] <= 'z')) {
                codepoint = HIRA_HE;
            }
            kana.innerHTML += "&#" + codepoint + ";";
            i += 1;
            break;

        case KATA_I:
            if (ascii[i - 1] === ascii[i] || ascii[i - 1] === 'E') {
                codepoint = 0x30FC;
            }
            kana.innerHTML += "&#" + codepoint + ";";
            i += 1;
            break;
        case KATA_U:
            if (ascii[i - 1] === ascii[i] || ascii[i - 1] === 'O') {
                codepoint = 0x30FC;
            }
            kana.innerHTML += "&#" + codepoint + ";";
            i += 1;
            break;
        case KATA_A:
        case KATA_E:
        case KATA_O:
            if (ascii[i - 1] === ascii[i]) {
                codepoint = 0x30FC;
            }
            kana.innerHTML += "&#" + codepoint + ";";
            i += 1;
            break;

        case KATA_VA:
            kana.innerHTML += "&#" + KATA_VU + ";" + "&#" + KATA_a + ";";
            i += 2;
            break;
        case KATA_VI:
            kana.innerHTML += "&#" + KATA_VU + ";" + "&#" + KATA_i + ";";
            i += 2;
            break;
        case KATA_VE:
            kana.innerHTML += "&#" + KATA_VU + ";" + "&#" + KATA_e + ";";
            i += 2;
            break;
        case KATA_VO:
            kana.innerHTML += "&#" + KATA_VU + ";" + "&#" + KATA_o + ";";
            i += 2;
            break;
        default:
            if (codepoint == 0) {
                if (ascii[i] === '\n') {
                    kana.innerHTML += "<br>";
                } else {
                    kana.innerHTML += ascii[i];
                }
                i += 1;
            } else {
                kana.innerHTML += "&#" + codepoint + ";";
                i += ascii_in;
            }
        }
    }
    return;
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
    case '.':  return 0x3002;
    case ',':  return 0x3001;

    case 'a':
        return HIRA_A;
    case 'i':
        return HIRA_I;
    case 'u':
        return HIRA_U;
    case 'e':
        return HIRA_E;
    case 'o':
        return HIRA_O; /* We'll have to handle "wo" externally.... */
    case 'n':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':
            return HIRA_NA;
        case 'i':
            return HIRA_NI;
        case 'u':
            return HIRA_NU;
        case 'e':
            return HIRA_NE;
        case 'o':
            return HIRA_NO;
        }
        ascii_in = 1;
        return HIRA_N;

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
    case 'A':
        return KATA_A;
    case 'I':
        return KATA_I;
    case 'U':
        return KATA_U;
    case 'E':
        return KATA_E;
    case 'O':
        return KATA_O;
    case 'N':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':
            return KATA_NA;
        case 'I':
            return KATA_NI;
        case 'U':
            return KATA_NU;
        case 'E':
            return KATA_NE;
        case 'O':
            return KATA_NO;
        }
        ascii_in = 1;
        return KATA_N;
    case ' ': /* spacing to separate "o" as the old "wo" particle */
        ascii_in = 2;
        switch (syllable[1]) {
        case 'o':
            if (syllable[2] != ' ')
                break;
            return HIRA_W_O; /* w-line "o" (legacy:  "wo") */
        case 'O':
            if (syllable[2] != ' ')
                break;
            return KATA_W_O;
        }
        ascii_in = 1;
        return (" ");

/*
 * Try to get most of the katakana-specific syllables out of the way.
 * These sounds are not native Japanese and do not exist in hiragana.
 */
    case 'D':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_DI;
        case 'Y':
            ascii_in = 3;
            return (toupper(syllable[2]) == 'U' ? KATA_DYU : 0);
        case 'U':  return 0;

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_DA;
        case 'E':  return KATA_DE;
        case 'O':  return KATA_DO;
        }
        return ERR_BROKEN_ROMAJI;
    case 'F':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_FA;
        case 'I':  return KATA_FI;
        case 'E':  return KATA_FE;
        case 'O':  return KATA_FO;

        case 'Y':
            ascii_in = 3;
            return (toupper(syllable[2]) == 'U' ? KATA_FYU : 0);
        case 'U':  return KATA_FU; /* DOES exist in hiragana ("hu") */
        }
        return ERR_BROKEN_ROMAJI;
    case 'T':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_TI;
        case 'S':
            ascii_in = 3;
            switch (toupper(syllable[2])) {
            case 'A':  return KATA_TSA;
            case 'I':  return KATA_TSI;
            case 'E':  return KATA_TSE;
            case 'O':  return KATA_TSO;

            case 'U':  return KATA_TSU; /* DOES exist in hiragana */
            default:  return 0;
            }

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_TA;
        case 'E':  return KATA_TE;
        case 'O':  return KATA_TO;
        case 'U':  return 0;
        }
        return 0;
    case 'V':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'U':  return KATA_VU; /* Native Japanese speakers use "BU" */
        case 'A':  return KATA_VA;
        case 'I':  return KATA_VI;
        case 'E':  return KATA_VE;
        case 'O':  return KATA_VO;
        }
        return 0;
    case 'W':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_WI;
        case 'E':  return KATA_WE;
        case 'O':  return KATA_W_O;

        case 'A':  return KATA_WA; /* DOES exist in hiragana */
        case 'U':  return KATA_WU;
        }
        return 0;

/*
 * PHEW!  Now let's focus on only the hiragana, natively present subset of
 * sounds actually present in the Japanese language.
 */
    case 'd':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_DA;
        case 'i':  return 0;
        case 'u':  return 0;
        case 'e':  return HIRA_DE;
        case 'o':  return HIRA_DO;
        }
        return 0;
    case 'f':
        ascii_in = 2;
        return (syllable[1] == 'u' ? HIRA_FU : 0);
    case 't':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_TA;
        case 's':
            ascii_in = 3;
            return (syllable[2] == 'u' ? HIRA_TSU : 0);
        case 'e':  return HIRA_TE;
        case 'o':  return HIRA_TO;
        }
        return 0;
    case 'w':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_WA;
        case 'i':  return HIRA_WI;
        case 'u':  return HIRA_WU;
        case 'e':  return HIRA_WE;
        case 'o':  return HIRA_W_O; /* deprecated; use " o " with spaces */
        }
        return 0;

/*
 * Now that just leaves the rows that share the same presence of syllables
 * in both katakana and hiragana together, making the rest of this function
 * simple to implement (except for that fucking 'N' sound maybe... to do).
 */
    case 'k':
        ascii_in = 2;
        return sound_from_vowel(HIRA_KA, syllable[1], 2);
    case 'K':
        ascii_in = 2;
        return sound_from_vowel(KATA_KA, tolower(syllable[1]), 2);

    case 's':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_SA;
        case 'h':
            ascii_in = 3;
            switch (syllable[2]) {
            case 'a':
                return HIRA_SHA;
            case 'i':
                return HIRA_SHI;
            case 'u':
                return HIRA_SHU;
            case 'e':
                return 0;
            case 'o':
                return HIRA_SHO;
            }
            return 0;
        case 'i':  return ERR_LOST_SYLLABLE;
        case 'u':  return HIRA_SU;
        case 'e':  return HIRA_SE;
        case 'o':  return HIRA_SO;
        }
        return 0;
    case 'c':
        ascii_in = 3;
        if (syllable[1] !== 'h') {
            return 0;
        }
        switch (syllable[2]) {
        case 'a':  return HIRA_CHA;
        case 'i':  return HIRA_CHI;
        case 'u':  return HIRA_CHU;
        case 'e':  return 0;
        case 'o':  return HIRA_CHO;
        }
        return 0;

    case 'h':
        ascii_in = 2;
        return sound_from_vowel(HIRA_HA, syllable[1], 3);
    case 'H':
        ascii_in = 2;
        return sound_from_vowel(KATA_HA, tolower(syllable[1]), 3);

    case 'm':
        ascii_in = 2;
        return sound_from_vowel(HIRA_MA, syllable[1], 1);
    case 'M':
        ascii_in = 2;
        return sound_from_vowel(KATA_MA, tolower(syllable[1]), 1);

    case 'r':
        ascii_in = 2;
        return sound_from_vowel(HIRA_RA, syllable[1], 1);
    case 'R':
        ascii_in = 2;
        return sound_from_vowel(KATA_RA, tolower(syllable[1]), 1);

    case 'y':
        ascii_in = 2;
        switch (syllable[1]) {
        case 'a':  return HIRA_YA;
        case 'i':  return HIRA_YI;
        case 'u':  return HIRA_YU;
        case 'e':  return HIRA_YE;
        case 'o':  return HIRA_YO;
        }
        return 0;
    case 'Y':
        ascii_in = 2;
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_YA;
        case 'I':  return KATA_YI;
        case 'U':  return KATA_YU;
        case 'E':  return KATA_YE;
        case 'O':  return KATA_YO;
        }
        return 0;

    case 'g':
        ascii_in = 2;
        return sound_from_vowel(HIRA_GA, syllable[1], 2);
    case 'G':
        ascii_in = 2;
        return sound_from_vowel(KATA_GA, tolower(syllable[1]), 2);
    case 'b':
        ascii_in = 2;
        return sound_from_vowel(HIRA_BA, syllable[1], 3);
    case 'B':
        ascii_in = 2;
        return sound_from_vowel(KATA_BA, tolower(syllable[1]), 3);
    case 'p':
        ascii_in = 2;
        return sound_from_vowel(HIRA_PA, syllable[1], 3);
    case 'P':
        ascii_in = 2;
        return sound_from_vowel(KATA_PA, tolower(syllable[1]), 3);
    }
    return 0;
}
