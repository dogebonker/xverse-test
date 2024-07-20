export const transformSnakeCaseToTitleCase = (snakeCaseString: string): string => 
    snakeCaseString
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');