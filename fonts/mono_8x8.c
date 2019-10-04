#include <stdio.h>
#include "../putchar.h"

unsigned char kfont8[NUMBER_OF_KANA_LETTERS][8];

void
kputc8(unsigned int code_point)
{
    unsigned char scanline, pixel;
    register unsigned int x, y;
    const unsigned char* glyph = &(kfont8[code_point][0]);

    for (y = 0; y < 8; y++) {
        scanline = glyph[y];
        for (x = 0; x < 8; x++) {
            pixel = (scanline >> (7 ^ x)) & 1;
            putchar(pixel ? '*' : ' ');
        }
        putchar('\n');
    }
}

unsigned short
a_to_kana(const char* syllable)
{
    if (syllable == NULL) {
        fputs(
            "Caught translation attempt from null pointer.\n",
            stderr
        );
        return 0xFFFFu;
    }

    switch (syllable[0]) {
    case 'a':  return HIRA_A;
    case 'i':  return HIRA_I;
    case 'u':  return HIRA_U;
    case 'e':  return HIRA_E;
    case 'o':  return HIRA_O; /* We'll have to handle "wo" externally.... */

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
    case 'A':  return KATA_A;
    case 'I':  return KATA_I;
    case 'U':  return KATA_U;
    case 'E':  return KATA_E;
    case 'O':  return KATA_O;
    case ' ': /* spacing to separate "o" as the old "wo" particle */
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

/*
 * Try to get most of the katakana-specific syllables out of the way.
 * These sounds are not native Japanese and do not exist in hiragana.
 */
    case 'D':
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_DI;
        case 'Y':  return (toupper(syllable[2]) == 'U' ? KATA_DYU : 0xFFFFu);

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_DA;
        case 'E':  return KATA_DE;
        case 'O':  return KATA_DO;
        }
        return 0xFFFFu;
    case 'F':
        switch (toupper(syllable[1])) {
        case 'A':  return KATA_FA;
        case 'I':  return KATA_FI;
        case 'Y':  return (toupper(syllable[2]) == 'U' ? KATA_FYU : 0xFFFFu);
        case 'E':  return KATA_FE;
        case 'O':  return KATA_FO;

        case 'U':  return KATA_FU; /* DOES exist in hiragana ("hu") */
        default:  return 0xFFFFu;
        }
    case 'T':
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_TI;
        case 'S':
            switch (toupper(syllable[2])) {
            case 'A':  return KATA_TSA;
            case 'I':  return KATA_TSI;
            case 'E':  return KATA_TSE;
            case 'O':  return KATA_TSO;

            case 'U':  return KATA_TSU; /* DOES exist in hiragana */
            default:  0xFFFFu;
            }

    /* The rest of these all exist as native sounds also in hiragana. */
        case 'A':  return KATA_TA;
        case 'E':  return KATA_TE;
        case 'O':  return KATA_TO;
        case 'U':  /* not sure why this one isn't listed...? */
            break;
        }
        return 0xFFFFu;
    case 'V':
        switch (toupper(syllable[1])) {
        case 'U':  return KATA_VU; /* Native Japanese speakers use "BU" */
        case 'A':  return KATA_VA;
        case 'I':  return KATA_VI;
        case 'E':  return KATA_VE;
        case 'O':  return KATA_VO;
        default:  return 0xFFFFu;
        }
    case 'W':
        switch (toupper(syllable[1])) {
        case 'I':  return KATA_WI;
        case 'E':  return KATA_WE;
        case 'O':  return KATA_WO;

        case 'A':  return KATA_WA; /* DOES exist in hiragana */
        case 'U':  /* the old "wu" syllable idea, eh?  dunno... */
        default:  return 0xFFFFu;
        }

/*
 * PHEW!  Now let's focus on only the hiragana, natively present subset of
 * sounds actually present in the Japanese language.
 */
    case 'd':
        switch (syllable[1]) {
        case 'a':  return HIRA_DA;
        case 'e':  return HIRA_DE;
        case 'o':  return HIRA_DO;
        }
        return 0xFFFFu;
    case 'f':
        return (syllable[1] == 'u' ? HIRA_FU : 0xFFFFu);
    case 't':
        switch (syllable[1]) {
        case 'a':  return HIRA_TA;
        case 's':  return (syllable[2] == 'u' ? HIRA_TSU : 0xFFFFu);
        case 'e':  return HIRA_TE;
        case 'o':  return HIRA_TO;
        }
        return 0xFFFFu;
    case 'w':
        switch (syllable[1]) {
        case 'a':  return HIRA_WA;
        case 'o':  return HIRA_W_O; /* deprecated; use " o " with spaces */
        }
        return 0xFFFFu;

/*
 * Now that just leaves the rows that share the same presence of syllables
 * in both katakana and hiragana together, making the rest of this function
 * simple to implement (except for that fucking 'N' sound maybe... to do).
 */
    }
    return 0xFFFFu;
}

void
hira8x8(void)
{
    kfont8[HIRA_A][0] = strtobyte("   |    ");
    kfont8[HIRA_A][1] = strtobyte("---|--- ");
    kfont8[HIRA_A][2] = strtobyte("   |    ");
    kfont8[HIRA_A][3] = strtobyte("  .... .");
    kfont8[HIRA_A][4] = strtobyte(" . |  . ");
    kfont8[HIRA_A][5] = strtobyte(".  | . .");
    kfont8[HIRA_A][6] = strtobyte(".  |.  .");
    kfont8[HIRA_A][7] = strtobyte(" .. | . ");

    return;
}

int
main(void)
{
    static char romaji[8];

    hira8x8();
    puts("Command-line invocation not yet implemented.");
    puts("Reverting to user input loop...");

    do {
        fputs("Specify a Japanese syllable, using Roman letters:  ", stdout);
        fgets(&romaji[0], sizeof(romaji), stdin);

        fputs("To do:  Try to print character using UTF8?\n", stderr);
        puts("ASCII bitmap simulation render:");
        kputc8(a_to_kana(&romaji[0]));
    } while (romaji[0] != '\n');
    return 0;
}
