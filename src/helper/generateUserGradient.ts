export function generateGradient(name: string): string {
    const colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple'
    ]; // Define an array of colors for the gradient
  
    const hue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length; // Generate hue based on character codes of name
    const startColor = colors[hue]; // Use the hue to select a starting color for the gradient
    const endColor = colors[(hue + 1) % colors.length]; // Use the next color in the array as the ending color for the gradient
  
    return `linear-gradient(to right, ${startColor}, ${endColor})`;
  }