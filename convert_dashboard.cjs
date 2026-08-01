const fs = require('fs');
const html = fs.readFileSync('src/components/views/dashboard.js', 'utf-8');
const { parse } = require('node-html-parser');

function camelCase(str) { return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase()); }

function styleToObject(styleString) {
  if (!styleString) return null;
  const res = {};
  styleString.split(';').forEach(s => {
    const parts = s.split(':');
    if (parts.length === 2) {
      res[camelCase(parts[0].trim())] = parts[1].trim();
    }
  });
  return res;
}

function toJSX(node) {
  if (node.nodeType === 3) {
    let text = node.text.trim();
    return text ? text : '';
  }
  if (node.nodeType === 8) return '{/* ' + node.text + ' */}';
  
  let tag = node.tagName;
  if (!tag) return '';

  let attrs = '';
  for (const [key, value] of Object.entries(node.attributes)) {
    let k = key;
    if (k === 'class') k = 'className';
    if (k === 'for') k = 'htmlFor';
    if (k === 'stroke-width') k = 'strokeWidth';
    if (k === 'viewbox') k = 'viewBox';
    if (k === 'cx') k = 'cx';
    if (k === 'cy') k = 'cy';
    if (k === 'r') k = 'r';
    
    if (k === 'onchange') {
      attrs += ` onChange={(e) => window.importFullBackupJSON(e.target)}`;
      continue;
    }
    if (k === 'style') {
      const obj = styleToObject(value);
      attrs += ` style={${JSON.stringify(obj)}}`;
      continue;
    }
    attrs += ` ${k}="${value}"`;
  }

  const children = node.childNodes.map(toJSX).filter(Boolean).join('\n');
  const selfClosing = ['input', 'img', 'br', 'hr', 'circle', 'path', 'rect', 'line'].includes(tag.toLowerCase());
  
  if (selfClosing) return `<${tag}${attrs} />`;
  return `<${tag}${attrs}>\n${children}\n</${tag}>`;
}

let extracted = html.replace('export default `', '').replace('`;', '').trim();
const root = parse(extracted);
const jsx = `import React from 'react';

export default function DashboardView() {
    return (
        ${toJSX(root)}
    );
}
`;
fs.writeFileSync('src/components/views/DashboardView.jsx', jsx);
