export const shipments = [
 {id:'CC-2048',name:'Atlantic salmon',category:'Seafood',origin:'General Santos',destination:'Cebu City',carrier:'Northstar Logistics',vehicle:'REEFER · V-204',status:'In transit',temp:3.8,humidity:82,limit:'0–4°C',risk:'Low',riskScore:12,shelf:4.8,progress:68,eta:'Today, 14:40',updated:'Just now',color:'mint',lat:9.65,lng:123.89},
 {id:'CC-2047',name:'Fresh milk',category:'Dairy',origin:'Bukidnon',destination:'Cagayan de Oro',carrier:'PolarRoute Freight',vehicle:'REEFER · V-118',status:'In transit',temp:6.7,humidity:76,limit:'1–5°C',risk:'High',riskScore:78,shelf:1.2,progress:42,eta:'Today, 16:15',updated:'1 min ago',color:'amber',lat:8.48,lng:124.65},
 {id:'CC-2046',name:'Romaine lettuce',category:'Produce',origin:'Malaybalay',destination:'Iligan City',carrier:'Green Mile Transport',vehicle:'REEFER · V-091',status:'In transit',temp:2.9,humidity:91,limit:'1–4°C',risk:'Low',riskScore:8,shelf:7.4,progress:83,eta:'Today, 12:20',updated:'2 min ago',color:'mint',lat:8.23,lng:124.24},
 {id:'CC-2045',name:'Pork cuts',category:'Meat',origin:'Davao City',destination:'Butuan City',carrier:'ColdFleet Express',vehicle:'REEFER · V-332',status:'Attention',temp:5.2,humidity:69,limit:'−2–2°C',risk:'Critical',riskScore:94,shelf:0.6,progress:29,eta:'Today, 19:05',updated:'3 min ago',color:'rose',lat:8.95,lng:125.54},
 {id:'CC-2044',name:'Mango crates',category:'Produce',origin:'Davao City',destination:'Iloilo City',carrier:'Suntrail Cargo',vehicle:'REEFER · V-076',status:'In transit',temp:11.4,humidity:88,limit:'10–13°C',risk:'Low',riskScore:16,shelf:5.1,progress:56,eta:'Tomorrow, 06:30',updated:'4 min ago',color:'mint',lat:10.72,lng:122.56},
 {id:'CC-2043',name:'Greek yogurt',category:'Dairy',origin:'Manila',destination:'Cagayan de Oro',carrier:'PolarRoute Freight',vehicle:'REEFER · V-151',status:'Delivered',temp:3.4,humidity:79,limit:'1–5°C',risk:'Low',riskScore:4,shelf:8.2,progress:100,eta:'Delivered 09:18',updated:'18 min ago',color:'mint',lat:8.48,lng:124.65}
]
export const temperatureHistory = Array.from({length:18},(_,i)=>({time:`${String(4+i).padStart(2,'0')}:00`,temp:Number((3.2+Math.sin(i*.72)*.55+(i>12?.45:0)).toFixed(1)),safeLow:0,safeHigh:4}))
export const alerts = [
 {id:1,type:'critical',title:'Critical temperature excursion',detail:'Pork cuts · CC-2045 · 5.2°C, above the −2–2°C range',time:'3 min ago'},
 {id:2,type:'warning',title:'Shelf-life threshold approaching',detail:'Fresh milk · CC-2047 · Estimated 1.2 days remaining',time:'8 min ago'},
 {id:3,type:'info',title:'Shipment successfully delivered',detail:'Greek yogurt · CC-2043 · Compliance score 99.2%',time:'18 min ago'}
]
