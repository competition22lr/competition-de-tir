export class Utilistaire {
    static convertMonthToNumber(abbreviation: string): number {
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

    static moisEnFrancais(moisNumero: number): string {
        const months: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        if (moisNumero >= 1 && moisNumero <= 12) {
            return months[moisNumero - 1];
        } else {
            return "Numéro de mois invalide";
        }
    }

    static moisEnAnglais(moisNumero: number): string {
        const months: string[] = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        if (moisNumero >= 1 && moisNumero <= 12) {
            return months[moisNumero - 1];
        } else {
            return "Numéro de mois invalide";
        }
    }

    static generateWatermarkedImage(imageUrl: string, watermarkText: string = "© TREPANIER.CC 2025"): Promise<string> {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.crossOrigin = 'anonymous'; // Important si image externe

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx?.drawImage(img, 0, 0);

                // Préparer le watermark
                ctx?.save();
                ctx?.translate(canvas.width / 2, canvas.height / 2);
                ctx?.rotate(-Math.atan(canvas.height / canvas.width));

                const diagonalLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
                ctx!.font = `${Math.floor(diagonalLength * 0.08)}px Arial`;
                ctx!.fillStyle = 'rgba(0, 0, 0, 0.6)';
                ctx!.textAlign = 'center';
                ctx!.textBaseline = 'middle';

                ctx?.fillText(watermarkText, 0, 0);

                ctx?.restore();

                const resultUrl = canvas.toDataURL('image/jpeg');
                resolve(resultUrl);
            };

            img.onerror = (error) => {
                reject(error);
            };

            img.src = imageUrl;
        });
    }
}