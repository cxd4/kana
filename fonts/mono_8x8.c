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
    for (;;) {
        fputs("Specify a Japanese syllable, using Roman letters:  ", stdout);
        fgets(&romaji[0], sizeof(romaji), stdin);

        fputs("To do:  Try to print character using UTF8?\n", stderr);
        puts("ASCII bitmap simulation render:");
        switch (romaji[0]) {
        case 'a':
            kputc8(HIRA_A);
            break;
        default:
            return 1;
        }
    }
    return 0;
}
