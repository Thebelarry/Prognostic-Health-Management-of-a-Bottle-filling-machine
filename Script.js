document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const users = { "Larry Thebe": "Larry1004" };
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginStatus = document.getElementById('login-status');
    const menuTab = document.getElementById('menu-tab');
    const dashboard = document.getElementById('dashboard');
    const history = document.getElementById('history');
    const dashboardButton = document.getElementById('dashboard-button');
    const historyButton = document.getElementById('history-button');
    const signOutButton = document.getElementById('signout-button');
    const randomizeButton = document.getElementById('randomize-button');
    const replacementMessage = document.getElementById('replacement-message');

    console.log("loginButton:", loginButton);
    console.log("usernameInput:", usernameInput);
    console.log("passwordInput:", passwordInput);
    console.log("loginStatus:", loginStatus);
    console.log("menuTab:", menuTab);

    if (loginButton) {
        console.log("login-button exists");
        loginButton.addEventListener('click', () => {
            console.log("Button clicked");
            const username = usernameInput.value;
            const password = passwordInput.value;

            console.log("Username entered:", username);
            console.log("Password entered:", password);
            console.log("Users object:", users);

            if (users[username] === password) {
                console.log("Login successful");
                loginStatus.textContent = 'Login Successful';
                menuTab.style.display = 'block';
                document.getElementById("login-tab").style.display = "none";
                updateChecklist();
                console.log("dashboard element after login:", document.getElementById('dashboard'));
            } else {
                console.log("Login failed");
                loginStatus.textContent = 'Login Failed';
            }
        });
    } else {
        console.log("login-button does not exist");
    }

    function predictRUL(params) {
        console.log("predictRUL called");
        console.log("params:", params);
        const torque = params.TorqueNm;
        const speed = params.RotationalSpeed_RPM;
        const temperature = params.Temperature_K;
        const pressure = params.Pressure_kPa;
        const wear = params.Wear;
        const vibration = params.Vibration;

        let rul = 100 - (wear / 3) - (vibration * 5) + (torque / 10) - ((temperature - 300) * 2) + ((pressure - 100) * 1.5) + (speed/500);
        if(rul < 0) rul = 0;

        document.getElementById('rul').textContent = rul.toFixed(2);
        console.log("RUL value:", rul);
        updateChecklist();
    }

    function updateChecklist() {
        console.log("updateChecklist called");
        const udi = parseFloat(document.getElementById('udi').textContent);
        const torque = parseFloat(document.getElementById('torque').textContent);
        const speed = parseFloat(document.getElementById('speed').textContent);
        const temperature = parseFloat(document.getElementById('temperature').textContent);
        const pressure = parseFloat(document.getElementById('pressure').textContent);
        const wear = parseFloat(document.getElementById('wear').textContent);
        const vibration = parseFloat(document.getElementById('vibration').textContent);
        const rul = parseFloat(document.getElementById('rul').textContent);

        console.log("rul value:", rul);

        function evaluate(value, goodThreshold, badThreshold) {
            if (value <= goodThreshold) return 'GOOD';
            if (value >= badThreshold) return 'BAD';
            return 'AVERAGE';
        }

        const fillerValves = evaluate(temperature, 300, 340);
        const shafts = evaluate(vibration, 3, 7);
        const headerTank = evaluate(pressure, 90, 110);
        const fillerDrive = evaluate(torque, 60, 90);
        const fillingNozzles = evaluate(wear, 100, 250);
        const liftersGuides = evaluate(speed, 1000, 2500);
        const potGuides = evaluate(udi, 2000, 8000);
        const transferPlate = evaluate(rul, 100, 50);
        const rubberInserts = evaluate(temperature, 310, 330);
        const sprockets = evaluate(vibration, 4, 6);
        const cams = evaluate(pressure, 95, 105);
        const bearings = evaluate(torque, 70, 80);
        const greasing = evaluate(wear, 150, 200);
        const timing = evaluate(speed, 1500, 2000);
        const waterfallConveyor = evaluate(udi, 3000, 7000);
        const looseBolts = evaluate(rul, 75, 25);
        const pneumaticSystem = evaluate(temperature, 320, 325);
        const gearboxOil = evaluate(vibration, 5, 5.5);

        console.log("fillerValves:", fillerValves);

        document.getElementById('filler-valves-wk1').textContent = fillerValves;
        document.getElementById('shafts-wk1').textContent = shafts;
        document.getElementById('header-tank-wk1').textContent = headerTank;
        document.getElementById('filler-drive-wk1').textContent = fillerDrive;
        document.getElementById('filling-nozzles-wk1').textContent = fillingNozzles;
        document.getElementById('lifters-guides-wk1').textContent = liftersGuides;
        document.getElementById('pot-guides-wk1').textContent = potGuides;
        document.getElementById('transfer-plate-wk1').textContent = transferPlate;
        document.getElementById('rubber-inserts-wk1').textContent = rubberInserts;
        document.getElementById('sprockets-wk1').textContent = sprockets;
        document.getElementById('cams-wk1').textContent = cams;
        document.getElementById('bearings-wk1').textContent = bearings;
        document.getElementById('greasing-wk1').textContent = greasing;
        document.getElementById('timing-wk1').textContent = timing;
        document.getElementById('waterfall-conveyor-wk1').textContent = waterfallConveyor;
        document.getElementById('loose-bolts-wk1').textContent = looseBolts;
        document.getElementById('pneumatic-system-wk1').textContent = pneumaticSystem;
        document.getElementById('gear-box-oil-wk1').textContent = gearboxOil;

        const badItems = [];
        if (fillerValves === 'BAD') badItems.push('FILLER BELLOW VALVES');
        if (shafts === 'BAD') badItems.push('SHAFTS');
        if (headerTank === 'BAD') badItems.push('HEADER TANK');
        if (fillerDrive === 'BAD') badItems.push('FILLER MAIN DRIVE');
        if (fillingNozzles === 'BAD') badItems.push('FILLING NOZZLES');
        if (liftersGuides === 'BAD') badItems.push('BOTTLE LIFTERS AND GUIDES');
        if (potGuides === 'BAD') badItems.push('POT GUIDES');
        if (transferPlate === 'BAD') badItems.push('TRANSFER PLATE');
        if (rubberInserts === 'BAD') badItems.push('SEALING RUBBER INSERTS');
        if (sprockets === 'BAD') badItems.push('FILLER AND SEALING SPROCKETS');
        if (cams === 'BAD') badItems.push('CAMS');
        if (bearings === 'BAD') badItems.push('BEARINGS');
        if (greasing === 'BAD') badItems.push('GREASING');
        if (timing === 'BAD') badItems.push('TIMING');
        if (waterfallConveyor === 'BAD') badItems.push('LIDS CONVEYING (LC) WATERFALL CONVEYOR');
        if (looseBolts === 'BAD') badItems.push('POT CONVEYING (PC) LOOSE BOLTS AND NUTS');
        if (pneumaticSystem === 'BAD') badItems.push('FILLER AND LC PNEUMATIC SYSTEM');
        if (gearboxOil === 'BAD') badItems.push('FILLER AND PC GEAR BOX OIL');

        if (badItems.length > 0) {
            replacementMessage.textContent = `Attention Maintenance required!\n${badItems.join('\n')}`;
        } else {
            replacementMessage.textContent = '';
        }

        const checklistItems = document.querySelectorAll('#checklist-table tbody tr');
        checklistItems.forEach(item => {
            const itemText = item.querySelector('td:first-child').textContent;
            let itemStatus = "";
            switch(itemText) {
                case "FILLER BELLOW VALVES": itemStatus = fillerValves; break;
                case "SHAFTS": itemStatus = shafts; break;
                case "HEADER TANK": itemStatus = headerTank; break;
                case "FILLER MAIN DRIVE": itemStatus = fillerDrive; break;
                case "FILLING NOZZLES": itemStatus = fillingNozzles; break;
                case "BOTTLE LIFTERS AND GUIDES": itemStatus = liftersGuides; break;
                case "POT GUIDES": itemStatus = potGuides; break;
                case "TRANSFER PLATE": itemStatus = transferPlate; break;
                case "SEALING RUBBER INSERTS": itemStatus = rubberInserts; break;
                case "FILLER AND SEALING SPROCKETS": itemStatus = sprockets; break;
                case "CAMS": itemStatus = cams; break;
                case "BEARINGS": itemStatus = bearings; break;
                case "GREASING": itemStatus = greasing; break;
                case "TIMING": itemStatus = timing; break;
                case "LIDS CONVEYING (LC) WATERFALL CONVEYOR": itemStatus = waterfallConveyor; break;
                case "POT CONVEYING (PC) LOOSE BOLTS AND NUTS": itemStatus = looseBolts; break;
                case "FILLER AND LC PNEUMATIC SYSTEM": itemStatus = pneumaticSystem; break;
                case "FILLER AND PC GEAR BOX OIL": itemStatus = gearboxOil; break;
            }

            if (itemStatus === "BAD") {
                item.classList.add('replace-needed');
            } else {
                item.classList.remove('replace-needed');
            }
        });

    }

    dashboardButton.addEventListener('click', () => {
        dashboard.style.display = 'block';
        history.style.display = 'none';
    });

    historyButton.addEventListener('click', () => {
        dashboard.style.display = 'none';
        history.style.display = 'block';
    });

    signOutButton.addEventListener('click', () => {
        menuTab.style.display = 'none';
        document.getElementById("login-tab").style.display = "block";
        loginStatus.textContent = "";
        usernameInput.value = "";
        passwordInput.value = "";
    });

    randomizeButton.addEventListener('click', () => {
        const params = {
            TorqueNm: Math.random() * (100 - 10) + 10,
            RotationalSpeed_RPM: Math.floor(Math.random() * (3000 - 500) + 500),
            Temperature_K: Math.random() * (350 - 280) + 280,
            Pressure_kPa: Math.random() * (120 - 80) + 80,
            Wear: Math.random() * 300,
            Vibration: Math.random() * 10,
        };

        document.getElementById('torque').textContent = params.TorqueNm.toFixed(2);
        document.getElementById('speed').textContent = params.RotationalSpeed_RPM.toFixed(2);
        document.getElementById('temperature').textContent = params.Temperature_K.toFixed(2);
        document.getElementById('pressure').textContent = params.Pressure_kPa.toFixed(2);
        document.getElementById('wear').textContent = params.Wear.toFixed(2);
        document.getElementById('vibration').textContent = params.Vibration.toFixed(2);

        predictRUL(params);
    });
});