import { environment } from "../../environments/environment";

export class Utilistaire {
    static convertMonthToNumber(abbreviation: string): number {
        // Nettoyage : on enlève les accents, les points et on met en minuscules
        const clean = abbreviation
            .normalize("NFD") // décompose les lettres accentuées
            .replace(/\p{Diacritic}/gu, "") // enlève les accents
            .replace('.', '') // enlève le point
            .toLowerCase();

        switch (clean) {
            case "jan":
            case "janvier":
            case "january":
                return 1;
            case "fev":
            case "fevrier":
            case "february":
                return 2;
            case "mar":
            case "mars":
            case "march":
                return 3;
            case "avr":
            case "avril":
            case "april":
                return 4;
            case "mai":
            case "may":
                return 5;
            case "jun":
            case "juin":
            case "june":
                return 6;
            case "jul":
            case "juillet":
            case "july":
                return 7;
            case "aou":
            case "aout":
            case "august":
                return 8;
            case "sep":
            case "septembre":
            case "september":
                return 9;
            case "oct":
            case "octobre":
            case "october":
                return 10;
            case "nov":
            case "novembre":
            case "november":
                return 11;
            case "dec":
            case "decembre":
            case "december":
                return 12;
            default:
                return -1;
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

    static Log(message?: any, ...optionalParams: any[]): void {
        if (!environment.production) {
            console.log(message, optionalParams);
        }
    }
}