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
    kfont8[HIRA_A][0]   = SB("   |    "); kfont8[HIRA_KA][0]  = SB(" |   .. ");
    kfont8[HIRA_A][1]   = SB("---|--- "); kfont8[HIRA_KA][1]  = SB(" |     .");
    kfont8[HIRA_A][2]   = SB("   |    "); kfont8[HIRA_KA][2]  = SB("-|---  .");
    kfont8[HIRA_A][3]   = SB("  .... ."); kfont8[HIRA_KA][3]  = SB(" |   - .");
    kfont8[HIRA_A][4]   = SB(" . |  . "); kfont8[HIRA_KA][4]  = SB(" |   -  ");
    kfont8[HIRA_A][5]   = SB(".  | . ."); kfont8[HIRA_KA][5]  = SB(" |   -  ");
    kfont8[HIRA_A][6]   = SB(".  |.  ."); kfont8[HIRA_KA][6]  = SB("|    -  ");
    kfont8[HIRA_A][7]   = SB(" .. | . "); kfont8[HIRA_KA][7]  = SB("|  --   ");

    kfont8[HIRA_I][0]   = SB("        "); kfont8[HIRA_KI][0]  = SB("    |   ");
    kfont8[HIRA_I][1]   = SB(" (      "); kfont8[HIRA_KI][1]  = SB("1111111 ");
    kfont8[HIRA_I][2]   = SB("(     ) "); kfont8[HIRA_KI][2]  = SB("     |  ");
    kfont8[HIRA_I][3]   = SB("(      )"); kfont8[HIRA_KI][3]  = SB(" 2222222");
    kfont8[HIRA_I][4]   = SB("(      )"); kfont8[HIRA_KI][4]  = SB("      | ");
    kfont8[HIRA_I][5]   = SB("(      )"); kfont8[HIRA_KI][5]  = SB("*       ");
    kfont8[HIRA_I][6]   = SB(" ( (    "); kfont8[HIRA_KI][6]  = SB("*       ");
    kfont8[HIRA_I][7]   = SB("  (     "); kfont8[HIRA_KI][7]  = SB(" *****  ");

    kfont8[HIRA_U][0]   = SB("  ----- "); kfont8[HIRA_KU][0]  = SB("    --- ");
    kfont8[HIRA_U][1]   = SB("        "); kfont8[HIRA_KU][1]  = SB("  --     ");
    kfont8[HIRA_U][2]   = SB("  ***** "); kfont8[HIRA_KU][2]  = SB(" -      ");
    kfont8[HIRA_U][3]   = SB("**     *"); kfont8[HIRA_KU][3]  = SB("-       ");
    kfont8[HIRA_U][4]   = SB("       *"); kfont8[HIRA_KU][4]  = SB("-       ");
    kfont8[HIRA_U][5]   = SB("       *"); kfont8[HIRA_KU][5]  = SB(" -      ");
    kfont8[HIRA_U][6]   = SB("     ** "); kfont8[HIRA_KU][6]  = SB("  --    ");
    kfont8[HIRA_U][7]   = SB(" ****   "); kfont8[HIRA_KU][7]  = SB("    --- ");

    kfont8[HIRA_E][0]   = SB("    --- "); kfont8[HIRA_KE][0]  = SB("      3 ");
    kfont8[HIRA_E][1]   = SB("        "); kfont8[HIRA_KE][1]  = SB("1  22232");
    kfont8[HIRA_E][2]   = SB(" ...... "); kfont8[HIRA_KE][2]  = SB("1 2   3 ");
    kfont8[HIRA_E][3]   = SB("       ."); kfont8[HIRA_KE][3]  = SB("1     3 ");
    kfont8[HIRA_E][4]   = SB("    ... "); kfont8[HIRA_KE][4]  = SB("1     3 ");
    kfont8[HIRA_E][5]   = SB("  ...   "); kfont8[HIRA_KE][5]  = SB("1     3 ");
    kfont8[HIRA_E][6]   = SB(" .  .  ."); kfont8[HIRA_KE][6]  = SB("1     3 ");
    kfont8[HIRA_E][7]   = SB(".    .. "); kfont8[HIRA_KE][7]  = SB(" 1  33  ");

    kfont8[HIRA_O][0]   = SB("   +  * "); kfont8[HIRA_KO][0]  = SB(" 11111  ");
    kfont8[HIRA_O][1]   = SB(" ++++  *"); kfont8[HIRA_KO][1]  = SB("      1 ");
    kfont8[HIRA_O][2]   = SB("   +   *"); kfont8[HIRA_KO][2]  = SB("        ");
    kfont8[HIRA_O][3]   = SB("  ++++  "); kfont8[HIRA_KO][3]  = SB("        ");
    kfont8[HIRA_O][4]   = SB(" + +  + "); kfont8[HIRA_KO][4]  = SB("2       ");
    kfont8[HIRA_O][5]   = SB("+  +   +"); kfont8[HIRA_KO][5]  = SB("2       ");
    kfont8[HIRA_O][6]   = SB("+ +    +"); kfont8[HIRA_KO][6]  = SB(" 2     2");
    kfont8[HIRA_O][7]   = SB(" +   ++ "); kfont8[HIRA_KO][7]  = SB("  22222 ");


    kfont8[HIRA_SA][0]  = SB("    1   "); kfont8[HIRA_TA][0]  = SB("   2    ");
    kfont8[HIRA_SA][1]  = SB("22222222"); kfont8[HIRA_TA][1]  = SB("1121111 ");
    kfont8[HIRA_SA][2]  = SB("     1  "); kfont8[HIRA_TA][2]  = SB("  2     ");
    kfont8[HIRA_SA][3]  = SB("     1  "); kfont8[HIRA_TA][3]  = SB(" 2  333 ");
    kfont8[HIRA_SA][4]  = SB("3    1  "); kfont8[HIRA_TA][4]  = SB(" 2     3");
    kfont8[HIRA_SA][5]  = SB("3       "); kfont8[HIRA_TA][5]  = SB("2       ");
    kfont8[HIRA_SA][6]  = SB(" 3      "); kfont8[HIRA_TA][6]  = SB("2  4    ");
    kfont8[HIRA_SA][7]  = SB("  333   "); kfont8[HIRA_TA][7]  = SB("2   4444");

    kfont8[HIRA_SHI][0] = SB("  .     "); kfont8[HIRA_CHI][0] = SB("   2    ");
    kfont8[HIRA_SHI][1] = SB(" .      "); kfont8[HIRA_CHI][1] = SB("11211111");
    kfont8[HIRA_SHI][2] = SB(" .      "); kfont8[HIRA_CHI][2] = SB("  2     ");
    kfont8[HIRA_SHI][3] = SB(".       "); kfont8[HIRA_CHI][3] = SB(" 2  222 ");
    kfont8[HIRA_SHI][4] = SB(".     . "); kfont8[HIRA_CHI][4] = SB(" 2 2   2");
    kfont8[HIRA_SHI][5] = SB(".     . "); kfont8[HIRA_CHI][5] = SB("  2    2");
    kfont8[HIRA_SHI][6] = SB(" .   .  "); kfont8[HIRA_CHI][6] = SB("      2 ");
    kfont8[HIRA_SHI][7] = SB("  ...   "); kfont8[HIRA_CHI][7] = SB("    22  ");

    kfont8[HIRA_SU][0]  = SB("     *  "); kfont8[HIRA_TSU][0] = SB("        ");
    kfont8[HIRA_SU][1]  = SB("-----*--"); kfont8[HIRA_TSU][1] = SB(" *****  ");
    kfont8[HIRA_SU][2]  = SB("     *  "); kfont8[HIRA_TSU][2] = SB("*     * ");
    kfont8[HIRA_SU][3]  = SB("  ****  "); kfont8[HIRA_TSU][3] = SB("       *");
    kfont8[HIRA_SU][4]  = SB(" *   ** "); kfont8[HIRA_TSU][4] = SB("       *");
    kfont8[HIRA_SU][5]  = SB("*   * * "); kfont8[HIRA_TSU][5] = SB("       *");
    kfont8[HIRA_SU][6]  = SB(" ***  * "); kfont8[HIRA_TSU][6] = SB("      * ");
    kfont8[HIRA_SU][7]  = SB("     *  "); kfont8[HIRA_TSU][7] = SB("   ***  ");

    kfont8[HIRA_SE][0]  = SB("      2 "); kfont8[HIRA_TE][0]  = SB("....... ");
    kfont8[HIRA_SE][1]  = SB(" 3    2 "); kfont8[HIRA_TE][1]  = SB("     .  ");
    kfont8[HIRA_SE][2]  = SB(" 3111121"); kfont8[HIRA_TE][2]  = SB("    .   ");
    kfont8[HIRA_SE][3]  = SB("13    2 "); kfont8[HIRA_TE][3]  = SB("   .    ");
    kfont8[HIRA_SE][4]  = SB(" 3    2 "); kfont8[HIRA_TE][4]  = SB("  .     ");
    kfont8[HIRA_SE][5]  = SB(" 3   2  "); kfont8[HIRA_TE][5]  = SB("  .     ");
    kfont8[HIRA_SE][6]  = SB("  3     "); kfont8[HIRA_TE][6]  = SB("  .     ");
    kfont8[HIRA_SE][7]  = SB("   3333 "); kfont8[HIRA_TE][7]  = SB("   .....");

    kfont8[HIRA_SO][0]  = SB(" ****** "); kfont8[HIRA_TO][0]  = SB(" .      ");
    kfont8[HIRA_SO][1]  = SB("   *    "); kfont8[HIRA_TO][1]  = SB(" .    **");
    kfont8[HIRA_SO][2]  = SB("  *     "); kfont8[HIRA_TO][2]  = SB("  . **  ");
    kfont8[HIRA_SO][3]  = SB("********"); kfont8[HIRA_TO][3]  = SB("  **    ");
    kfont8[HIRA_SO][4]  = SB("   *    "); kfont8[HIRA_TO][4]  = SB(" *      ");
    kfont8[HIRA_SO][5]  = SB("  *     "); kfont8[HIRA_TO][5]  = SB("*       ");
    kfont8[HIRA_SO][6]  = SB("  *   * "); kfont8[HIRA_TO][6]  = SB("*      *");
    kfont8[HIRA_SO][7]  = SB("   ***  "); kfont8[HIRA_TO][7]  = SB(" ****** ");


    kfont8[HIRA_NA][0]  = SB("  2  44 "); kfont8[HIRA_HA][0]  = SB("      3 ");
    kfont8[HIRA_NA][1]  = SB("1121   4"); kfont8[HIRA_HA][1]  = SB("1  22232");
    kfont8[HIRA_NA][2]  = SB(" 2   3 4"); kfont8[HIRA_HA][2]  = SB("1     3 ");
    kfont8[HIRA_NA][3]  = SB(" 2   3  "); kfont8[HIRA_HA][3]  = SB("1  3333 ");
    kfont8[HIRA_NA][4]  = SB("2  3333 "); kfont8[HIRA_HA][4]  = SB("1 3   33");
    kfont8[HIRA_NA][5]  = SB("2 3   33"); kfont8[HIRA_HA][5]  = SB("1 3   3 ");
    kfont8[HIRA_NA][6]  = SB("  3   3 "); kfont8[HIRA_HA][6]  = SB("1 3   3 ");
    kfont8[HIRA_NA][7]  = SB("   333  "); kfont8[HIRA_HA][7]  = SB("   333  ");

    kfont8[HIRA_NI][0]  = SB(" 1  222 "); kfont8[HIRA_HI][0]  = SB("***     ");
    kfont8[HIRA_NI][1]  = SB("1      2"); kfont8[HIRA_HI][1]  = SB("   * ** ");
    kfont8[HIRA_NI][2]  = SB("1       "); kfont8[HIRA_HI][2]  = SB("  *  * *");
    kfont8[HIRA_NI][3]  = SB("1       "); kfont8[HIRA_HI][3]  = SB(" *   * *");
    kfont8[HIRA_NI][4]  = SB("1   3   "); kfont8[HIRA_HI][4]  = SB("*    *  ");
    kfont8[HIRA_NI][5]  = SB("1  3    "); kfont8[HIRA_HI][5]  = SB("*    *  ");
    kfont8[HIRA_NI][6]  = SB("1  3    "); kfont8[HIRA_HI][6]  = SB("*   *   ");
    kfont8[HIRA_NI][7]  = SB(" 1  3333"); kfont8[HIRA_HI][7]  = SB(" ***    ");

    kfont8[HIRA_NU][0]  = SB("  1 2   "); kfont8[HIRA_HU][0]  = SB("  11    ");
    kfont8[HIRA_NU][1]  = SB("  22222 "); kfont8[HIRA_HU][1]  = SB(" 1  1   ");
    kfont8[HIRA_NU][2]  = SB(" 21 2  2"); kfont8[HIRA_HU][2]  = SB("    1   ");
    kfont8[HIRA_NU][3]  = SB("2 1 2  2"); kfont8[HIRA_HU][3]  = SB("   2  4 ");
    kfont8[HIRA_NU][4]  = SB("2 1 2 22"); kfont8[HIRA_HU][4]  = SB(" 3  2  4");
    kfont8[HIRA_NU][5]  = SB("2 12 2 2"); kfont8[HIRA_HU][5]  = SB("3    2 4");
    kfont8[HIRA_NU][6]  = SB("2 12 2 2"); kfont8[HIRA_HU][6]  = SB("3    2 4");
    kfont8[HIRA_NU][7]  = SB(" 22   2 "); kfont8[HIRA_HU][7]  = SB("3 222  4");

    kfont8[HIRA_NE][0]  = SB("  1 22  "); kfont8[HIRA_HE][0]  = SB("        ");
    kfont8[HIRA_NE][1]  = SB("2 12  2 "); kfont8[HIRA_HE][1]  = SB("  **    ");
    kfont8[HIRA_NE][2]  = SB("2 2    2"); kfont8[HIRA_HE][2]  = SB(" *  *   ");
    kfont8[HIRA_NE][3]  = SB("221    2"); kfont8[HIRA_HE][3]  = SB(" *   *  ");
    kfont8[HIRA_NE][4]  = SB("2 1  222"); kfont8[HIRA_HE][4]  = SB("*     * ");
    kfont8[HIRA_NE][5]  = SB("  1 2  2"); kfont8[HIRA_HE][5]  = SB("*     * ");
    kfont8[HIRA_NE][6]  = SB("  1 2  2"); kfont8[HIRA_HE][6]  = SB("       *");
    kfont8[HIRA_NE][7]  = SB("  1  22 "); kfont8[HIRA_HE][7]  = SB("       *");

    kfont8[HIRA_NO][0]  = SB("  ....  "); kfont8[HIRA_HO][0]  = SB("   22242");
    kfont8[HIRA_NO][1]  = SB(" .    . "); kfont8[HIRA_HO][1]  = SB("1     4 ");
    kfont8[HIRA_NO][2]  = SB(".   .  ."); kfont8[HIRA_HO][2]  = SB("1   3343");
    kfont8[HIRA_NO][3]  = SB(".   .  ."); kfont8[HIRA_HO][3]  = SB("1     4 ");
    kfont8[HIRA_NO][4]  = SB(".   .  ."); kfont8[HIRA_HO][4]  = SB("1  4444 ");
    kfont8[HIRA_NO][5]  = SB(".   .  ."); kfont8[HIRA_HO][5]  = SB("1 4   44");
    kfont8[HIRA_NO][6]  = SB(".  .  . "); kfont8[HIRA_HO][6]  = SB("1 4   4 ");
    kfont8[HIRA_NO][7]  = SB(" ..  .  "); kfont8[HIRA_HO][7]  = SB("   444  ");


    kfont8[HIRA_MA][0]  = SB("     3  "); kfont8[HIRA_RA][0]  = SB("   111  ");
    kfont8[HIRA_MA][1]  = SB("11111311"); kfont8[HIRA_RA][1]  = SB(" 2    1 ");
    kfont8[HIRA_MA][2]  = SB("     3  "); kfont8[HIRA_RA][2]  = SB("2       ");
    kfont8[HIRA_MA][3]  = SB(" 222232 "); kfont8[HIRA_RA][3]  = SB("2  2222 ");
    kfont8[HIRA_MA][4]  = SB("     3  "); kfont8[HIRA_RA][4]  = SB("2 2    2");
    kfont8[HIRA_MA][5]  = SB(" 333333 "); kfont8[HIRA_RA][5]  = SB(" 2     2");
    kfont8[HIRA_MA][6]  = SB("3    3 3"); kfont8[HIRA_RA][6]  = SB("      2 ");
    kfont8[HIRA_MA][7]  = SB(" 3333   "); kfont8[HIRA_RA][7]  = SB("   222  ");

    kfont8[HIRA_MI][0]  = SB(" 111    "); kfont8[HIRA_RI][0]  = SB(" 1   2  ");
    kfont8[HIRA_MI][1]  = SB("1   1   "); kfont8[HIRA_RI][1]  = SB("1     2 ");
    kfont8[HIRA_MI][2]  = SB("    1 2 "); kfont8[HIRA_RI][2]  = SB("1     2 ");
    kfont8[HIRA_MI][3]  = SB("  11112 "); kfont8[HIRA_RI][3]  = SB("1 1   2 ");
    kfont8[HIRA_MI][4]  = SB(" 1  1 21"); kfont8[HIRA_RI][4]  = SB(" 1    2 ");
    kfont8[HIRA_MI][5]  = SB("1   1 2 "); kfont8[HIRA_RI][5]  = SB("      2 ");
    kfont8[HIRA_MI][6]  = SB("1  1  2 "); kfont8[HIRA_RI][6]  = SB("     2  ");
    kfont8[HIRA_MI][7]  = SB(" 11  2  "); kfont8[HIRA_RI][7]  = SB("  222   ");

    kfont8[HIRA_MU][0]  = SB("   2  3 "); kfont8[HIRA_RU][0]  = SB("  ****  ");
    kfont8[HIRA_MU][1]  = SB("11121  3"); kfont8[HIRA_RU][1]  = SB("      * ");
    kfont8[HIRA_MU][2]  = SB("   2    "); kfont8[HIRA_RU][2]  = SB("   ***  ");
    kfont8[HIRA_MU][3]  = SB(" 222    "); kfont8[HIRA_RU][3]  = SB("      * ");
    kfont8[HIRA_MU][4]  = SB("2  2   2"); kfont8[HIRA_RU][4]  = SB(" ***   *");
    kfont8[HIRA_MU][5]  = SB("2  2   2"); kfont8[HIRA_RU][5]  = SB("*   *  *");
    kfont8[HIRA_MU][6]  = SB("2  2   2"); kfont8[HIRA_RU][6]  = SB("*   * * ");
    kfont8[HIRA_MU][7]  = SB(" 22 222 "); kfont8[HIRA_RU][7]  = SB(" *****  ");

    kfont8[HIRA_ME][0]  = SB("  1 2   "); kfont8[HIRA_RE][0]  = SB("  1 222 ");
    kfont8[HIRA_ME][1]  = SB("  22222 "); kfont8[HIRA_RE][1]  = SB("2 12   2");
    kfont8[HIRA_ME][2]  = SB(" 21 2  2"); kfont8[HIRA_RE][2]  = SB("2 2   2 ");
    kfont8[HIRA_ME][3]  = SB("2 1 2  2"); kfont8[HIRA_RE][3]  = SB("221  2  ");
    kfont8[HIRA_ME][4]  = SB("2 1 2  2"); kfont8[HIRA_RE][4]  = SB("2 1 2   ");
    kfont8[HIRA_ME][5]  = SB("2 1 2  2"); kfont8[HIRA_RE][5]  = SB("  1 2  2");
    kfont8[HIRA_ME][6]  = SB("2 12   2"); kfont8[HIRA_RE][6]  = SB("  1 2  2");
    kfont8[HIRA_ME][7]  = SB(" 22   2 "); kfont8[HIRA_RE][7]  = SB("  1  22 ");

    kfont8[HIRA_MO][0]  = SB("   3    "); kfont8[HIRA_RO][0]  = SB("  ****  ");
    kfont8[HIRA_MO][1]  = SB("1131111 "); kfont8[HIRA_RO][1]  = SB("      * ");
    kfont8[HIRA_MO][2]  = SB("  3     "); kfont8[HIRA_RO][2]  = SB("   ***  ");
    kfont8[HIRA_MO][3]  = SB("232222  "); kfont8[HIRA_RO][3]  = SB("      * ");
    kfont8[HIRA_MO][4]  = SB(" 3      "); kfont8[HIRA_RO][4]  = SB("       *");
    kfont8[HIRA_MO][5]  = SB(" 3     3"); kfont8[HIRA_RO][5]  = SB("       *");
    kfont8[HIRA_MO][6]  = SB(" 3    3 "); kfont8[HIRA_RO][6]  = SB("*     * ");
    kfont8[HIRA_MO][7]  = SB("  3333  "); kfont8[HIRA_RO][7]  = SB(" *****  ");


    kfont8[HIRA_YA][0]  = SB("1    3  "); kfont8[HIRA_ya][0]  = SB("        ");
    kfont8[HIRA_YA][1]  = SB(" 1 2232 "); kfont8[HIRA_ya][1]  = SB("        ");
    kfont8[HIRA_YA][2]  = SB(" 22  3 2"); kfont8[HIRA_ya][2]  = SB(" 1  3   ");
    kfont8[HIRA_YA][3]  = SB("21  3  2"); kfont8[HIRA_ya][3]  = SB("  1232  ");
    kfont8[HIRA_YA][4]  = SB("  1    2"); kfont8[HIRA_ya][4]  = SB("222 3 2 ");
    kfont8[HIRA_YA][5]  = SB("  1   2 "); kfont8[HIRA_ya][5]  = SB("  1   2 ");
    kfont8[HIRA_YA][6]  = SB("   1    "); kfont8[HIRA_ya][6]  = SB("   1 2  ");
    kfont8[HIRA_YA][7]  = SB("   1    "); kfont8[HIRA_ya][7]  = SB("   1    ");

    kfont8[HIRA_YU][0]  = SB("1   2   "); kfont8[HIRA_yu][0]  = SB("        ");
    kfont8[HIRA_YU][1]  = SB("1  1211 "); kfont8[HIRA_yu][1]  = SB("        ");
    kfont8[HIRA_YU][2]  = SB("1 1 2  1"); kfont8[HIRA_yu][2]  = SB("    2   ");
    kfont8[HIRA_YU][3]  = SB("11  2  1"); kfont8[HIRA_yu][3]  = SB("1 1121  ");
    kfont8[HIRA_YU][4]  = SB("1   2  1"); kfont8[HIRA_yu][4]  = SB("11  2 1 ");
    kfont8[HIRA_YU][5]  = SB("   2   1"); kfont8[HIRA_yu][5]  = SB("1  2  1 ");
    kfont8[HIRA_YU][6]  = SB("   2 11 "); kfont8[HIRA_yu][6]  = SB("   2 1  ");
    kfont8[HIRA_YU][7]  = SB("  2     "); kfont8[HIRA_yu][7]  = SB("  2     ");

    kfont8[HIRA_YO][0]  = SB("    1   "); kfont8[HIRA_yo][0]  = SB("        ");
    kfont8[HIRA_YO][1]  = SB("     122"); kfont8[HIRA_yo][1]  = SB("        ");
    kfont8[HIRA_YO][2]  = SB("     2  "); kfont8[HIRA_yo][2]  = SB("  1     ");
    kfont8[HIRA_YO][3]  = SB("  1111  "); kfont8[HIRA_yo][3]  = SB("   122  ");
    kfont8[HIRA_YO][4]  = SB(" 1   11 "); kfont8[HIRA_yo][4]  = SB("   2    ");
    kfont8[HIRA_YO][5]  = SB("1    1 1"); kfont8[HIRA_yo][5]  = SB(" 222    ");
    kfont8[HIRA_YO][6]  = SB("1   1   "); kfont8[HIRA_yo][6]  = SB("2  22   ");
    kfont8[HIRA_YO][7]  = SB(" 111    "); kfont8[HIRA_yo][7]  = SB(" 22  2  ");

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
