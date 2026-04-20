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
window.getTrackingData = getTrackingData;

(function() {
  
  window.dataLayer = window.dataLayer || [];
  const pathname = window.location.pathname;  

  document.addEventListener("DOMContentLoaded", function() {
      
    /* Se dispara al ver una categoría o lista de productos. Esencial para el seguimiento de comercio electrónico. - PLP */
    function view_item_list(items, item_list_name){

      // const pathname = window.location.pathname;
      // 👇 Obtener tracking desde la función
      const tracking = getTrackingData();

      items = items.map((item, index) => ({
        item_name: item.name,
        item_brand: item.brand.name,
        item_category: item.subcategory.name,
        item_list_name: 'Equipos de ' + item_list_name,
        index: index + 1
      }));

      /*
      *** Evento Page view
      */
      try {
        window.dataLayer.push({
          event: "view_item_list",
          item_list_name:item_list_name,
          items:items,
          tracking: tracking
        });
      } catch (e) {
        console.log("Error view_item_list: ", e);
      }

    }
    window.view_item_list = view_item_list;

    /* Se activa cuando un usuario visita la página específica de un producto. PDP */
    function view_item(item, item_variant){

      const tracking = getTrackingData();
      try {
        window.dataLayer.push({
          event: "view_item",
          ecommerce: {
            currency: "MXN",
            items: [
              {
                item_name: item.name,
                item_brand: item.brand.name,
                item_category: item.subcategory.name,
                item_variant: item_variant,
                currency: "MXN"
              }
            ]
          },
          tracking: tracking
        });
      } catch (e) {
        console.log("Error view_item: ", e);
      }
    } 
    window.view_item = view_item;




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

