/**
 * Timer - функция для работы с данными в таймере
 * @returns {object} - объект с методами необходимыми для управления Timer
 */
const Timer = function () {
    let timer_container;
    let end_time_container;
    let countdown;
    
    /**
     * init - функция инициализирует наш модуль, в котором устанавливаем значения которые нам переданы извне
     * @param {object} settings - объект с настройками
     */
    function init(settings) {
        timer_container = document.querySelector(settings.timer_container);
        end_time_container = document.querySelector(settings.timer_end_date_container);
        return this;
    };

    /**
     * start - функция запускает таймер на указанное время в секундах
     * @param {number} seconds
     */
    function start(seconds) {
        if (!seconds || typeof seconds !== "number") return console.log("Please provide seconds");

        clearInterval(countdown);

        const now = Date.now();
        const end = now + seconds * 1000;

        _display_time_left(seconds);
        _display_end_time(end);

        // вывести в разметку таймер и дату окончания работы таймера
        countdown = setInterval(() => {
            const second_left = Math.round((end - Date.now()) / 1000);
            
            if (second_left < 0) return clearInterval(countdown);
            
            _display_time_left(second_left);
        }, 1000);
    };

    /**
     * stop - функция принудительно останавливает таймер
     */
    function stop() {
        clearInterval(countdown);
        timer_container.textContent = "";
        end_time_container.textContent = "";
    };

    /**
     * _display_time_left - функция выводит данные в разметку
     * @param {number} seconds 
     */
    function _display_time_left(seconds) {
        const minutes =  Math.floor(seconds / 60);
        const hour = Math.floor(minutes / 60);
        const day = Math.floor(hour / 24);
        const reminder_seconds = seconds % 60;
        const reminder_minutes = minutes % 60;
        const reminder_hour = hour % 24;
        const display = `${day === 0 ? '' : day + 'day '}${(day === 0 && reminder_hour === 0) ? '' : reminder_hour + ':'}${reminder_minutes < 10 ? '0' : ''}${reminder_minutes}:${reminder_seconds < 10 ? '0' : ''}${reminder_seconds}`;
        timer_container.textContent = display;
        document.title = display;
    };

    /**
     * _display_end_time - функция выводит данные в разметку
     * @param {number} end 
     */
    function _display_end_time(end) {
        const end_date = new Date(end);
        const obj = end_date.toLocaleString('en', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        const display = `Be back at ${obj}`;
        end_time_container.textContent = display;
    };

    return  {
        init,
        start, 
        stop
    };
};

const btns = document.querySelectorAll("[data-time]");
const reset_btn = document.querySelector(".stop__button");

/**создание Таймера */
const my_timer1 = Timer().init({
    timer_container: ".display__time-left",
    timer_end_date_container: ".display__end-time"
});

/**
 * onClickHandler - функция обработчик события click на кнопки
 * @param {object} e 
 */
function onClickHandler(e) {
    let seconds = Number(this.dataset.time);
    my_timer1.start(seconds);
};

btns.forEach(btn => btn.addEventListener("click", onClickHandler));
reset_btn.addEventListener("click", my_timer1.stop);

const form = document.forms["customForm"];
/**
 * onSubmitHandler - функция обработчик события submit на поле input
 * @param {object} e 
 */
function onSubmitHandler(e) {
    e.preventDefault();
    const input = document.forms.customForm.elements.minutes;
    const seconds = input.value * 60;
    my_timer1.start(seconds);
}
form.addEventListener('submit', onSubmitHandler);


