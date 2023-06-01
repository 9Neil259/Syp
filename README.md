# Event Planning App

Dies ist eine Event-Planungsanwendung, die es Benutzern ermöglicht, Veranstaltungen zu erstellen, anzuzeigen und auszuwählen. Die Anwendung basiert auf Node.js, Express und Redis.

## Installation

1. Stelle sicher, dass Node.js und Redis auf deinem System installiert sind.
2. Klone das Repository auf deinen lokalen Computer.
3. Navigiere im Terminal zum Verzeichnis des Projekts.

  
Installiere die Abhängigkeiten, indem du den Befehl ausführst:
npm install

Starte den Node.js-Server, indem du den Befehl ausführst:
node server.js

Öffne einen Webbrowser und gehe zu http://localhost:3000, um die Anwendung zu verwenden.

## Funktionen

Erstellen von Veranstaltungen mit Namen, Datum und Ort.
Anzeigen einer Liste aller erstellten Veranstaltungen.
Anzeigen von Details einer ausgewählten Veranstaltung.
Hinzufügen von ausgewählten Veranstaltungen zu einer Liste.
Entfernen von Veranstaltungen aus der Liste der ausgewählten Veranstaltungen.
Anzeigen der Gästeliste für eine ausgewählte Veranstaltung.

## Verzeichnisstruktur
server.js: Der Hauptdatei des Node.js-Servers.
routes/eventRoutes.js: Definiert die Routen für die Event-Endpunkte.
models/Event.js: Die Event-Modellklasse.
components/: Enthält die React-Komponenten für die Benutzeroberfläche.
public/: Enthält statische Dateien wie CSS-Stylesheets und Bilder.

## Abhängigkeiten
Express: Webframework für den Node.js-Server.
Redis: Datenbank für die Speicherung der Event-Daten.
axios: HTTP-Client für die Kommunikation zwischen Client und Server.
react: JavaScript-Bibliothek für die Benutzeroberfläche.
react-dom: DOM-Schnittstelle für React.
react-router-dom: Routing-Bibliothek für React.

## Autoren
Neil Agy

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert.
