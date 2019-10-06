#include <ctype.h>
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

void
hira8x8(void)
{
    kfont8[HIRA_A][0]   = strtobyte("   |    "); kfont8[HIRA_KA][0] = strtobyte(" |   .. ");
    kfont8[HIRA_A][1]   = strtobyte("---|--- "); kfont8[HIRA_KA][1] = strtobyte(" |     .");
    kfont8[HIRA_A][2]   = strtobyte("   |    "); kfont8[HIRA_KA][2] = strtobyte("-|---  .");
    kfont8[HIRA_A][3]   = strtobyte("  .... ."); kfont8[HIRA_KA][3] = strtobyte(" |   - .");
    kfont8[HIRA_A][4]   = strtobyte(" . |  . "); kfont8[HIRA_KA][4] = strtobyte(" |   -  ");
    kfont8[HIRA_A][5]   = strtobyte(".  | . ."); kfont8[HIRA_KA][5] = strtobyte(" |   -  ");
    kfont8[HIRA_A][6]   = strtobyte(".  |.  ."); kfont8[HIRA_KA][6] = strtobyte("|    -  ");
    kfont8[HIRA_A][7]   = strtobyte(" .. | . "); kfont8[HIRA_KA][7] = strtobyte("|  --   ");

    kfont8[HIRA_I][0]   = strtobyte("        "); kfont8[HIRA_KI][0] = strtobyte("    |   ");
    kfont8[HIRA_I][1]   = strtobyte(" (      "); kfont8[HIRA_KI][1] = strtobyte("1111111 ");
    kfont8[HIRA_I][2]   = strtobyte("(     ) "); kfont8[HIRA_KI][2] = strtobyte("     |  ");
    kfont8[HIRA_I][3]   = strtobyte("(      )"); kfont8[HIRA_KI][3] = strtobyte(" 2222222");
    kfont8[HIRA_I][4]   = strtobyte("(      )"); kfont8[HIRA_KI][4] = strtobyte("      | ");
    kfont8[HIRA_I][5]   = strtobyte("(      )"); kfont8[HIRA_KI][5] = strtobyte("*       ");
    kfont8[HIRA_I][6]   = strtobyte(" ( (    "); kfont8[HIRA_KI][6] = strtobyte("*       ");
    kfont8[HIRA_I][7]   = strtobyte("  (     "); kfont8[HIRA_KI][7] = strtobyte(" *****  ");

    kfont8[HIRA_U][0]   = strtobyte("  ----- "); kfont8[HIRA_KU][0] = strtobyte("    --- ");
    kfont8[HIRA_U][1]   = strtobyte("        "); kfont8[HIRA_KU][1] = strtobyte("  --     ");
    kfont8[HIRA_U][2]   = strtobyte("  ***** "); kfont8[HIRA_KU][2] = strtobyte(" -      ");
    kfont8[HIRA_U][3]   = strtobyte("**     *"); kfont8[HIRA_KU][3] = strtobyte("-       ");
    kfont8[HIRA_U][4]   = strtobyte("       *"); kfont8[HIRA_KU][4] = strtobyte("-       ");
    kfont8[HIRA_U][5]   = strtobyte("       *"); kfont8[HIRA_KU][5] = strtobyte(" -      ");
    kfont8[HIRA_U][6]   = strtobyte("     ** "); kfont8[HIRA_KU][6] = strtobyte("  --    ");
    kfont8[HIRA_U][7]   = strtobyte(" ****   "); kfont8[HIRA_KU][7] = strtobyte("    --- ");

    kfont8[HIRA_E][0]   = strtobyte("    --- "); kfont8[HIRA_KE][0] = strtobyte("      3 ");
    kfont8[HIRA_E][1]   = strtobyte("        "); kfont8[HIRA_KE][1] = strtobyte("1  22232");
    kfont8[HIRA_E][2]   = strtobyte(" ...... "); kfont8[HIRA_KE][2] = strtobyte("1 2   3 ");
    kfont8[HIRA_E][3]   = strtobyte("       ."); kfont8[HIRA_KE][3] = strtobyte("1     3 ");
    kfont8[HIRA_E][4]   = strtobyte("    ... "); kfont8[HIRA_KE][4] = strtobyte("1     3 ");
    kfont8[HIRA_E][5]   = strtobyte("  ...   "); kfont8[HIRA_KE][5] = strtobyte("1     3 ");
    kfont8[HIRA_E][6]   = strtobyte(" .  .  ."); kfont8[HIRA_KE][6] = strtobyte("1     3 ");
    kfont8[HIRA_E][7]   = strtobyte(".    .. "); kfont8[HIRA_KE][7] = strtobyte(" 1  33  ");

    kfont8[HIRA_O][0]   = strtobyte("   +  * "); kfont8[HIRA_KO][0] = strtobyte(" 11111  ");
    kfont8[HIRA_O][1]   = strtobyte(" ++++  *"); kfont8[HIRA_KO][1] = strtobyte("      1 ");
    kfont8[HIRA_O][2]   = strtobyte("   +   *"); kfont8[HIRA_KO][2] = strtobyte("        ");
    kfont8[HIRA_O][3]   = strtobyte("  ++++  "); kfont8[HIRA_KO][3] = strtobyte("        ");
    kfont8[HIRA_O][4]   = strtobyte(" + +  + "); kfont8[HIRA_KO][4] = strtobyte("2       ");
    kfont8[HIRA_O][5]   = strtobyte("+  +   +"); kfont8[HIRA_KO][5] = strtobyte("2       ");
    kfont8[HIRA_O][6]   = strtobyte("+ +    +"); kfont8[HIRA_KO][6] = strtobyte(" 2     2");
    kfont8[HIRA_O][7]   = strtobyte(" +   ++ "); kfont8[HIRA_KO][7] = strtobyte("  22222 ");

    kfont8[HIRA_SA][0]  = strtobyte("    1   "); kfont8[HIRA_TA][0]  = strtobyte("   2    ");
    kfont8[HIRA_SA][1]  = strtobyte("22222222"); kfont8[HIRA_TA][1]  = strtobyte("1121111 ");
    kfont8[HIRA_SA][2]  = strtobyte("     1  "); kfont8[HIRA_TA][2]  = strtobyte("  2     ");
    kfont8[HIRA_SA][3]  = strtobyte("     1  "); kfont8[HIRA_TA][3]  = strtobyte(" 2  333 ");
    kfont8[HIRA_SA][4]  = strtobyte("3    1  "); kfont8[HIRA_TA][4]  = strtobyte(" 2     3");
    kfont8[HIRA_SA][5]  = strtobyte("3       "); kfont8[HIRA_TA][5]  = strtobyte("2       ");
    kfont8[HIRA_SA][6]  = strtobyte(" 3      "); kfont8[HIRA_TA][6]  = strtobyte("2  4    ");
    kfont8[HIRA_SA][7]  = strtobyte("  333   "); kfont8[HIRA_TA][7]  = strtobyte("2   4444");

    kfont8[HIRA_SHI][0] = strtobyte("  .     "); kfont8[HIRA_CHI][0] = strtobyte("   2    ");
    kfont8[HIRA_SHI][1] = strtobyte(" .      "); kfont8[HIRA_CHI][1] = strtobyte("11211111");
    kfont8[HIRA_SHI][2] = strtobyte(" .      "); kfont8[HIRA_CHI][2] = strtobyte("  2     ");
    kfont8[HIRA_SHI][3] = strtobyte(".       "); kfont8[HIRA_CHI][3] = strtobyte(" 2  222 ");
    kfont8[HIRA_SHI][4] = strtobyte(".     . "); kfont8[HIRA_CHI][4] = strtobyte(" 2 2   2");
    kfont8[HIRA_SHI][5] = strtobyte(".     . "); kfont8[HIRA_CHI][5] = strtobyte("  2    2");
    kfont8[HIRA_SHI][6] = strtobyte(" .   .  "); kfont8[HIRA_CHI][6] = strtobyte("      2 ");
    kfont8[HIRA_SHI][7] = strtobyte("  ...   "); kfont8[HIRA_CHI][7] = strtobyte("    22  ");

    kfont8[HIRA_SU][0]  = strtobyte("     *  "); kfont8[HIRA_TSU][0] = strtobyte("        ");
    kfont8[HIRA_SU][1]  = strtobyte("-----*--"); kfont8[HIRA_TSU][1] = strtobyte(" *****  ");
    kfont8[HIRA_SU][2]  = strtobyte("     *  "); kfont8[HIRA_TSU][2] = strtobyte("*     * ");
    kfont8[HIRA_SU][3]  = strtobyte("  ****  "); kfont8[HIRA_TSU][3] = strtobyte("       *");
    kfont8[HIRA_SU][4]  = strtobyte(" *   ** "); kfont8[HIRA_TSU][4] = strtobyte("       *");
    kfont8[HIRA_SU][5]  = strtobyte("*   * * "); kfont8[HIRA_TSU][5] = strtobyte("       *");
    kfont8[HIRA_SU][6]  = strtobyte(" ***  * "); kfont8[HIRA_TSU][6] = strtobyte("      * ");
    kfont8[HIRA_SU][7]  = strtobyte("     *  "); kfont8[HIRA_TSU][7] = strtobyte("   ***  ");

    kfont8[HIRA_SE][0]  = strtobyte("      2 "); kfont8[HIRA_TE][0]  = strtobyte("....... ");
    kfont8[HIRA_SE][1]  = strtobyte(" 3    2 "); kfont8[HIRA_TE][1]  = strtobyte("     .  ");
    kfont8[HIRA_SE][2]  = strtobyte(" 3111121"); kfont8[HIRA_TE][2]  = strtobyte("    .   ");
    kfont8[HIRA_SE][3]  = strtobyte("13    2 "); kfont8[HIRA_TE][3]  = strtobyte("   .    ");
    kfont8[HIRA_SE][4]  = strtobyte(" 3    2 "); kfont8[HIRA_TE][4]  = strtobyte("  .     ");
    kfont8[HIRA_SE][5]  = strtobyte(" 3   2  "); kfont8[HIRA_TE][5]  = strtobyte("  .     ");
    kfont8[HIRA_SE][6]  = strtobyte("  3     "); kfont8[HIRA_TE][6]  = strtobyte("  .     ");
    kfont8[HIRA_SE][7]  = strtobyte("   3333 "); kfont8[HIRA_TE][7]  = strtobyte("   .....");

    kfont8[HIRA_SO][0]  = strtobyte(" ****** "); kfont8[HIRA_TO][0]  = strtobyte(" .      ");
    kfont8[HIRA_SO][1]  = strtobyte("   *    "); kfont8[HIRA_TO][1]  = strtobyte(" .    **");
    kfont8[HIRA_SO][2]  = strtobyte("  *     "); kfont8[HIRA_TO][2]  = strtobyte("  . **  ");
    kfont8[HIRA_SO][3]  = strtobyte("********"); kfont8[HIRA_TO][3]  = strtobyte("  **    ");
    kfont8[HIRA_SO][4]  = strtobyte("   *    "); kfont8[HIRA_TO][4]  = strtobyte(" *      ");
    kfont8[HIRA_SO][5]  = strtobyte("  *     "); kfont8[HIRA_TO][5]  = strtobyte("*       ");
    kfont8[HIRA_SO][6]  = strtobyte("  *   * "); kfont8[HIRA_TO][6]  = strtobyte("*      *");
    kfont8[HIRA_SO][7]  = strtobyte("   ***  "); kfont8[HIRA_TO][7]  = strtobyte(" ****** ");

    return;
}

int
main(void)
{
    static char romaji[8];
    unsigned int kana_ID;

    hira8x8();
    puts("Command-line invocation not yet implemented.");
    puts("Reverting to user input loop...");

    do {
        fputs("Specify a Japanese syllable, using Roman letters:  ", stdout);
        fgets(&romaji[0], sizeof(romaji), stdin);

        fputs("To do:  Try to print character using UTF8?\n", stderr);
        puts("ASCII bitmap simulation render:");
        switch (kana_ID = a_to_kana(&romaji[0])) {
        case ERR_BROKEN_ROMAJI:
            fputs("Corrupt input.  Cannot interpret as a syllable.\n", stderr);
            break;
        case ERR_LOST_SYLLABLE:
            fputs(
                "The meaning of the requested syllable was historically lost "\
                "a long time ago.  It is no longer valid in modern Japanese.\n",
                stderr
            );
            break;
        case ERR_NULL_PTR_INPUT:
        case ERR_UNKNOWN:
        case ERR_UNUSED:
            fprintf(stderr, "Unknown error (code %u) has occured.\n", kana_ID);
            break;
        default:
            kputc8(kana_ID);
        }
    } while (romaji[0] != '\n');
    return 0;
}
