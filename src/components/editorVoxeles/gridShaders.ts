
export const baseGridShader = {
  vertexShader: `
    varying vec3 vWorldPosition; 
    void main() { 
      vec4 worldPosition = modelMatrix * vec4(position, 1.0); 
      vWorldPosition = worldPosition.xyz; 
      gl_Position = projectionMatrix * viewMatrix * worldPosition; 
    }
  `,
  fragmentShader: `
    varying vec3 vWorldPosition; 
    uniform vec3 uColor; 
    uniform float uSize; 
    
    float getGrid(float size) { 
      vec2 r = vWorldPosition.xz / size; 
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r); 
      float line = min(grid.x, grid.y); 
      return 1.0 - min(line, 1.0); 
    } 
    
    void main() { 
      float grid = getGrid(uSize); 
      float dist = distance(vWorldPosition.xz, vec2(0.0));
      
      // CHANGED: Reduced max distance to 500.0 (approx 40 blocks radius)
      float mask = 1.0 - smoothstep(0.0, 500.0, dist);
      
      // CHANGED: Increased power to 3.0 for a quicker, sharper fade
      mask = pow(mask, 3.0);
      
      float alpha = grid * mask * 0.5; 
      
      if (alpha <= 0.01) discard; 
      gl_FragColor = vec4(uColor, alpha); 
    }
  `
};

export const cursorGridShader = {
  vertexShader: `
    varying vec2 vUv; 
    void main() { 
      vUv = uv; 
      vec4 worldPosition = modelMatrix * vec4(position, 1.0); 
      gl_Position = projectionMatrix * viewMatrix * worldPosition; 
    }
  `,
  fragmentShader: `
    varying vec2 vUv; 
    uniform vec3 uColor; 
    uniform float uSize; 
    uniform vec3 uWorldOffset; 
    
    float getGrid(float size) { 
      vec2 r = (uWorldOffset.xz + (vUv - 0.5) * 500.0) / size; 
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r); 
      float line = min(grid.x, grid.y); 
      return 1.0 - min(line, 1.0); 
    } 
    
    void main() { 
      float grid = getGrid(uSize); 
      float dist = distance(vUv, vec2(0.5)); 
      float alpha = 1.0 - smoothstep(0.0, 0.2, dist); 
      
      // Center highlight logic
      vec2 localUV = (vUv - 0.5) * 500.0;
      vec2 cellCoords = floor((localUV + uSize * 0.5) / uSize);
      bool isCenter = cellCoords.x == 0.0 && cellCoords.y == 0.0;
      
      float finalAlpha = alpha * grid;
      float intensity = 0.5;
      
      if(isCenter) {
         finalAlpha = 0.6; 
         intensity = 0.8;
      }
  
      if (finalAlpha <= 0.0) discard; 
      gl_FragColor = vec4(uColor, finalAlpha * intensity); 
    }
  `
};