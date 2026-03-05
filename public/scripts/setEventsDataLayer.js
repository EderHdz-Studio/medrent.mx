function getTrackingData() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
    sessionId = 'sess-' + Date.now() + '-' + Math.floor(Math.random() * 100000);
    sessionStorage.setItem('sessionId', sessionId);
    }

    const pathname = window.location.pathname;
    const url = window.location.href;
    const referrer = document.referrer || "(direct)";

    // Leer parámetros UTM
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || '';
    const utm_medium = urlParams.get('utm_medium') || '';
    const utm_campaign = urlParams.get('utm_campaign') || '';
    const utm_term = urlParams.get('utm_term') || '';
    const utm_content = urlParams.get('utm_content') || '';

    // Datos actuales
    const newData = {
        sessionId: sessionId,
        utm: {
            source: utm_source,
            medium: utm_medium,
            campaign: utm_campaign,
            term: utm_term,
            content: utm_content
        },
        page: {
            url: url,
            path: pathname,
            title: document.title,
            host: document.location.host,
            referrer: referrer
        }
    }
    // Recuperar lo que haya en localStorage
    const storedData = JSON.parse(localStorage.getItem('trackingData'));

    if (storedData) {
        // Si el sessionId cambió, resetea todo
        if (storedData.sessionId !== sessionId) {
            localStorage.setItem('trackingData', JSON.stringify(newData));
        } else {
            // Comparar UTM, si cambian se actualiza
            const storedUtm = storedData.utm || {};
            const hasChanges = Object.keys(newData.utm).some(
            key => newData.utm[key] !== storedUtm[key]
            );

            if (hasChanges) {
                localStorage.setItem('trackingData', JSON.stringify(newData));
            }
        }
    } else {
        // Si no hay nada en localStorage, guardar
        localStorage.setItem('trackingData', JSON.stringify(newData));
    }

    return newData;
}

(function() {

    window.dataLayer = window.dataLayer || [];

    document.addEventListener("DOMContentLoaded", function() {

        const pathname = window.location.pathname;
        // 👇 Obtener tracking desde la función
        const tracking = getTrackingData();

        /*
        *** Evento Page view
        */
        try {
          window.dataLayer.push({
            event: "custom_page_view",
            event_data: {
              category: "Page Engagement",
              action: "Page View",
              label: "Page view - " + pathname
            },
            tracking: tracking
          });
        } catch (e) {
          console.log("Error_pageView: ", e);
        }

        /*
        *** Evento Click WhatsApp
        */
        const btnWhats = document.getElementById('btnWhatsapp');
        if (btnWhats) {
            btnWhats.addEventListener('click', () => {
              try {
                const urlParams = new URLSearchParams(window.location.search);
                window.dataLayer.push({
                    event: 'whatsapp_lead',
                    event_data: {
                      category: "Acction WhatsApp",
                      action: "click whatsapp",
                      label: "Page view - " + pathname
                    },
                    tracking: tracking
                });
              } catch (err) {
                console.log(err)
              }
            });
          }
        });
    }
)();