// Basic mode
const display = document.getElementById('display');
let expr = '';

function updateDisplay(v){
  display.textContent = v ?? '0';
}

function resetBasic(){ expr=''; updateDisplay('0'); }

document.querySelectorAll('.mode-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.mode-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    document.querySelectorAll('.mode').forEach(m=>m.classList.add('hidden'));
    document.getElementById(b.dataset.mode).classList.remove('hidden');
  });
});

document.querySelectorAll('.key').forEach(k=>{
  k.addEventListener('click', ()=>{
    const d = k.dataset.digit;
    const act = k.dataset.action;
    if(d!==undefined){
      if(expr==='0' && d !== '.') expr = d; else expr += d;
      updateDisplay(expr);
      return;
    }
    if(act==='clear') { expr=''; updateDisplay('0'); return; }
    if(act==='back'){ expr = expr.slice(0,-1); updateDisplay(expr || '0'); return; }
    if(act==='op'){ const op = k.textContent.trim(); expr += op; updateDisplay(expr); return; }
    if(act==='equals'){
      try{
        const jsExpr = expr.replace(/×/g,'*').replace(/÷/g,'/');
        const result = Function('return ('+jsExpr+')')();
        if(result===Infinity || result===-Infinity || Number.isNaN(result)){
          updateDisplay('Undefined'); expr='';
        } else {
          updateDisplay(formatNum(result)); expr=String(result);
        }
      }catch(e){ updateDisplay('Error'); expr=''; }
    }
  });
});

function formatNum(n){
  if(Number.isInteger(n)) return String(n);
  return parseFloat(n.toFixed(10)).toString();
}

// Matrix mode
function parseMatrix(text){
  if(!text.trim()) return null;
  const rows = text.trim().split(/\r?\n/).map(r=>r.trim()).filter(r=>r.length);
  const mat = rows.map(r=>{
    return r.split(/[ ,]+/).map(v=>{
      const n = parseFloat(v);
      return Number.isFinite(n)?n:NaN;
    });
  });
  const colCount = Math.max(...mat.map(r=>r.length));
  for(const r of mat){ while(r.length<colCount) r.push(0); }
  return mat;
}

function dims(m){ return [m.length, m[0]?.length||0]; }

function matAdd(A,B){
  const [r1,c1]=dims(A); const [r2,c2]=dims(B);
  if(r1!==r2 || c1!==c2) throw new Error('Dimension mismatch');
  const R = Array.from({length:r1},(_,i)=>Array.from({length:c1},(_,j)=>A[i][j]+B[i][j]));
  return R;
}

function matMul(A,B){
  const [r1,c1]=dims(A); const [r2,c2]=dims(B);
  if(c1!==r2) throw new Error('Inner dimensions must match');
  const R = Array.from({length:r1},()=>Array.from({length:c2},()=>0));
  for(let i=0;i<r1;i++) for(let k=0;k<c1;k++) for(let j=0;j<c2;j++) R[i][j]+=A[i][k]*B[k][j];
  return R;
}

function showMatrix(mat){
  if(!mat) return '';
  return '<table class="result-table">'+mat.map(r=>'<tr>'+r.map(c=>`<td>${formatNum(c)}</td>`).join('')+'</tr>').join('')+'</table>';
}

document.getElementById('matAdd').addEventListener('click', ()=>{
  const A = parseMatrix(document.getElementById('matA').value);
  const B = parseMatrix(document.getElementById('matB').value);
  const out = document.getElementById('matResult');
  try{
    if(!A||!B) throw new Error('Enter both matrices');
    const R = matAdd(A,B);
    out.innerHTML = showMatrix(R);
  }catch(e){ out.textContent = e.message; }
});

document.getElementById('matMul').addEventListener('click', ()=>{
  const A = parseMatrix(document.getElementById('matA').value);
  const B = parseMatrix(document.getElementById('matB').value);
  const out = document.getElementById('matResult');
  try{
    if(!A||!B) throw new Error('Enter both matrices');
    const R = matMul(A,B);
    out.innerHTML = showMatrix(R);
  }catch(e){ out.textContent = e.message; }
});

document.getElementById('matClear').addEventListener('click', ()=>{
  document.getElementById('matA').value='';
  document.getElementById('matB').value='';
  document.getElementById('matResult').textContent='';
});

// Quadratic mode
document.getElementById('solveQuad').addEventListener('click', ()=>{
  const a = parseFloat(document.getElementById('qa').value);
  const b = parseFloat(document.getElementById('qb').value);
  const c = parseFloat(document.getElementById('qc').value);
  const out = document.getElementById('quadResult');
  try{
    if(!Number.isFinite(a)) throw new Error('Enter coefficient a');
    if(a===0) throw new Error('a cannot be 0');
    const D = b*b - 4*a*c;
    if(D>0){
      const r1 = (-b + Math.sqrt(D))/(2*a);
      const r2 = (-b - Math.sqrt(D))/(2*a);
      out.innerHTML = `Roots: <strong>${formatNum(r1)}</strong>, <strong>${formatNum(r2)}</strong>`;
    } else if(D===0){
      const r = -b/(2*a);
      out.innerHTML = `One root: <strong>${formatNum(r)}</strong>`;
    } else {
      const real = (-b/(2*a)).toFixed(6);
      const imag = (Math.sqrt(-D)/(2*a)).toFixed(6);
      out.innerHTML = `Roots: <strong>${real} + ${imag}i</strong>, <strong>${real} - ${imag}i</strong>`;
    }
  }catch(e){ out.textContent = e.message; }
});

document.getElementById('clearQuad').addEventListener('click', ()=>{
  document.getElementById('qa').value='';
  document.getElementById('qb').value='';
  document.getElementById('qc').value='';
  document.getElementById('quadResult').textContent='';
});

// Initialize
resetBasic();
