export class Utilistaire {
    static convertMonthToNumber(abbreviation: string) : number {
        switch (abbreviation.replace('.', '').toLowerCase()) { // Convert to lowercase to avoid case sensitivity and remove the dot
            case "jan":
                return 1; // Janvier (January)
            case "fev":
                return 2; // Février (February)
            case "mar":
                return 3; // Mars (March)
            case "avr":
                return 4; // Avril (April)
            case "mai":
                return 5; // Mai (May)
            case "jun":
                return 6; // Juin (June)
            case "jul":
                return 7; // Juillet (July)
            case "aou":
                return 8; // Août (August)
            case "sep":
                return 9; // Septembre (September)
            case "oct":
                return 10; // Octobre (October)
            case "nov":
                return 11; // Novembre (November)
            case "dec":
                return 12; // Décembre (December)
            default:
                return -1; // Return -1 if the month abbreviation is invalid
        }
    }

    static moisEnFrancais(moisNumero: number) : string {
        const months: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        if (moisNumero >= 1 && moisNumero <= 12) {
            return months[moisNumero - 1];
        } else {
            return "Numéro de mois invalide";
        }
    }
}